import { useEffect, useState } from 'react';
import { Monster } from '../../models/interfaces/monster.interface';
import {
  BattleMonsterCard,
  BattleMonsterTitle,
  ProgressBar,
} from './MonsterBattleCard.styled';

type MonsterCardProps = {
  monster?: Monster | null;
  title?: string;
};

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ monster, title }) => {
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);

  useEffect(() => {
    setSelectedMonster(monster || null);
  }, [monster]);

  return (
    <BattleMonsterCard centralized>
      {!selectedMonster && <BattleMonsterTitle>{title}</BattleMonsterTitle>}
      {selectedMonster && (
        <div>
          <img src={selectedMonster.imageUrl} alt={selectedMonster.name} />
          <h3>{selectedMonster.name}</h3>
          <hr />
          <div>
            <label>HP:</label>
            <ProgressBar
              className="selectedBar"
              variant="determinate"
              value={selectedMonster.hp}
            />
          </div>
          <div>
            <label>Attack:</label>
            <ProgressBar
              className="selectedBar"
              variant="determinate"
              value={selectedMonster.attack}
            />
          </div>
          <div>
            <label>Defense:</label>
            <ProgressBar
              className="selectedBar"
              variant="determinate"
              value={selectedMonster.defense}
            />
          </div>
          <div>
            <label>Speed:</label>
            <ProgressBar
              className="selectedBar"
              variant="determinate"
              value={selectedMonster.speed}
            />
          </div>
        </div>
      )}
    </BattleMonsterCard>
  );
};

export { MonsterBattleCard };
