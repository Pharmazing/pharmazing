import { createStyleSheet } from 'react-native-unistyles';

export const prescriptionsListStyles = createStyleSheet((theme) => ({
  scrollBox: { padding: 16, gap: 16 },
  vendorCardContainer: {
    padding: 3,
    flex: 1,
    borderRadius: 27,
  },
  card: {
    backgroundColor: theme.colors.BgDefault,
    borderRadius: 24,
    padding: 16,

    flexDirection: 'column',
    flex: 1,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    color: theme.colors.FgDefault,
    fontFamily: 'Roboto700Bold',
    fontWeight: '500',
  },
  detail: {
    color: theme.colors.FgDefault,
    opacity: 0.7,
    fontSize: 14,
    marginTop: 4,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    color: '#fff',
    fontSize: 12,
    overflow: 'hidden',
  },
}));
