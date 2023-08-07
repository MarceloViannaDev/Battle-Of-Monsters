import styled from '@emotion/styled';
import {
  Card,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from '@mui/material';
import { colors } from '../../constants/colors';

export const BattleMonsterCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'centralized',
})<{ centralized?: boolean }>(({ centralized }) => ({
  padding: '13px 11px',
  width: 'calc(307px - 22px)',
  height: '415px',
  background: colors.white,
  boxShadow: '-2px 3px 10px rgba(0, 0, 0, 0.25)',
  borderRadius: '7px',
  display: centralized ? 'flex' : 'auto',
  alignItems: centralized ? 'center' : 'auto',
  justifyContent: centralized ? 'center' : 'auto',
  flexWrap: centralized ? 'wrap' : 'nowrap',

  '& div': {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },

  '& img': {
    width: '283px',
    height: '178px',
    filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25))',
    borderRadius: '7px',
    marginBottom: '14px',
  },

  '& h3': {
    fontSize: '22px',
    lineHeight: '26px',
    marginBottom: '5px',
  },

  '& hr': {
    marginBottom: '11px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  },

  '& label': {
    display: 'block',
    fontSize: '12px',
    lineHeight: '14px',
    marginBottom: '5px',
  },

  '& .selectedBar': {
    marginBottom: '11px',
  },
}));

export const BattleMonsterTitle = styled(Typography)(() => ({
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '36px',
  lineHeight: '42px',
  color: colors.black,
}));

export const ProgressBar = styled(LinearProgress)(
  ({ value }: { value: number }) => {
    const barColor = value < 50 ? colors.weakColor : colors.progressColor;

    return {
      height: 8,
      borderRadius: 15,
      [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: colors.progressBarBackground,
      },
      [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 15,
        backgroundColor: barColor,
      },
    };
  },
);
