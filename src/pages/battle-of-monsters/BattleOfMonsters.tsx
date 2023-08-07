import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { MonsterBattleCard } from '../../components/monster-battle-card/MonsterBattleCard';
import { MonstersList } from '../../components/monsters-list/MonstersList';
import { Title } from '../../components/title/Title';
import { fetchMonstersData } from '../../reducers/monsters/monsters.actions';
import {
  selectMonsters,
  selectSelectedMonster,
} from '../../reducers/monsters/monsters.selectors';
import {
  BattleSection,
  PageContainer,
  StartBattleButton,
} from './BattleOfMonsters.styled';
import { Monster } from '../../models/interfaces/monster.interface';
import { WinnerDisplay } from '../../components/winner-display/WinnerDisplay';
import { BattleResponse } from '../../models/interfaces/batteresponse.interface';

const BattleOfMonsters = () => {
  const dispatch = useAppDispatch();
  const monsters = useSelector(selectMonsters);
  const selectedMonster = useSelector(selectSelectedMonster);

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, [dispatch]); // first

  const [computerMonster, setComputerMonster] = useState<Monster | null>(null);
  const [winner, setWinner] = useState<Monster | null>(null);
  const [showWinnerMessage, setShowWinnerMessage] = useState<boolean>(false);
  const [tie, setTie] = useState<boolean>(false);

  useEffect(() => {
    if (selectedMonster) {
      const availableMonsters = monsters.filter(
        (monster) => monster !== selectedMonster,
      );
      const randomIndex = Math.floor(Math.random() * availableMonsters.length);
      const selectedComputerMonster = availableMonsters[randomIndex];
      setComputerMonster(selectedComputerMonster);
      setWinner(null);
      setTie(false);
    } else {
      setComputerMonster(null);
      setWinner(null);
      setTie(false);
    }
  }, [monsters, selectedMonster]);

  /**
   * The function `handleStartBattleClick` sends a POST request to a battle endpoint with selected
   * monster data, receives a battle result, and updates the state with the winner and tie information.
   */
  const handleStartBattleClick = async () => {
    if (selectedMonster && computerMonster) {
      const battleData = {
        monster1Id: selectedMonster.id,
        monster2Id: computerMonster.id,
      };

      try {
        const response = await fetch('http://localhost:3001/battle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(battleData),
        });

        if (response.ok) {
          const battleResult: BattleResponse = await response.json();
          setWinner(battleResult.winner);
          setTie(battleResult.tie);
          setShowWinnerMessage(true);

          if (battleResult.tie) {
            // Handle tie logic if necessary
          }
        } else {
          console.error('Battle request failed');
        }
      } catch (error) {
        console.error('Network error during battle request:', error);
      }
    }
  };

  return (
    <PageContainer>
      <Title>Battle of Monsters</Title>

      <MonstersList monsters={monsters} />

      {showWinnerMessage && (winner || tie) && (
        <WinnerDisplay text={tie ? "It's a tie. Nobody" : `${winner?.name}`} />
      )}

      <BattleSection>
        <MonsterBattleCard
          monster={selectedMonster}
          title={selectedMonster?.name || 'Player'}></MonsterBattleCard>
        <StartBattleButton
          data-testid="start-battle-button"
          disabled={selectedMonster === null}
          onClick={handleStartBattleClick}>
          Start Battle
        </StartBattleButton>
        <MonsterBattleCard monster={computerMonster} title="Computer" />
      </BattleSection>
    </PageContainer>
  );
};

export { BattleOfMonsters };
