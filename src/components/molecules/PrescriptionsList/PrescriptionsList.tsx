import { PrescriptionsListProps } from './PrescriptionsList.types';
import { useStyles } from 'react-native-unistyles';
import { LinearGradient } from 'expo-linear-gradient';
import { Box, ScrollBox, Typography } from '../../atoms';
import { prescriptionsListStyles } from './PrescriptionsList.styles';

const statusColors = {
  'Ready for Pickup': '#4caf50',
  'In Progress': '#ff9800',
  Filled: '#2196f3',
};

export const PrescriptionsList = ({
  prescriptions,
}: PrescriptionsListProps) => {
  const { theme, styles } = useStyles(prescriptionsListStyles);

  return (
    <ScrollBox contentContainerStyle={styles.scrollBox}>
      {prescriptions.map((rx) => (
        <LinearGradient
          key={rx.id}
          colors={[theme.colors.Blue500, theme.colors.Green500]}
          style={styles.vendorCardContainer}
        >
          <Box style={styles.card}>
            <Box style={styles.cardTop}>
              <Typography style={styles.title}>{rx.name}</Typography>
              <Typography
                style={[
                  styles.statusBadge,
                  { backgroundColor: statusColors[rx.status as string] },
                ]}
              >
                {rx.status}
              </Typography>
            </Box>
            <Typography
              style={styles.detail}
            >{`Dosage: ${rx.dosage}`}</Typography>
            <Typography
              style={styles.detail}
            >{`Frequency: ${rx.frequency}`}</Typography>
            <Typography
              style={styles.detail}
            >{`Pharmacy: ${rx.pharmacyName}`}</Typography>
          </Box>
        </LinearGradient>
      ))}
    </ScrollBox>
  );
};
