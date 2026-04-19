import { Drawer } from 'expo-router/drawer';
import CustomDrawer from '../components/CustomDrawer';

export default function RootLayout() {
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawer {...props} />}
        >
            <Drawer.Screen name="news" options={{ title: 'Новини' }} />
            <Drawer.Screen name="contacts" options={{ title: 'Контакти' }} />
        </Drawer>
    );
}