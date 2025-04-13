import { Box, Button, ButtonVariantEnum, Icon, ScrollBox, Typography } from '../components';

export default function PrescriptionsLayout() {
  return (
    <Box style={{flex: 1, borderWidth: 2, borderColor: 'red'}}>
      <ScrollBox style={{borderWidth: 2, borderColor: 'red'}}>
      <Typography>I am prescriptions page</Typography>

      </ScrollBox>
      <Button title='Add new prescription' style={{position: 'static', alignSelf: 'center', width: '80%'}} btnVariant={ButtonVariantEnum.PRIMARY} icon={<Icon name='PlusIcon' color="white" />}/>
    </Box>
  );
}
