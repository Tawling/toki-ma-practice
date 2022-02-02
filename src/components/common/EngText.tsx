import { useContext } from 'react';
import { LanguageContext } from '../../App';

interface Props {
    children?: React.ReactNode;
}

const EngText = ({ children }: Props) => {
    const language = useContext(LanguageContext);
    return language === 'eng' ? <>{children}</> : null;
};

export default EngText;
