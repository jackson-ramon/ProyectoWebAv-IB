import { CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.css';

export default function ShopLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <CustomProvider>
            {children}
        </CustomProvider>
    );
}