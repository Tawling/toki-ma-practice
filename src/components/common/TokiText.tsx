import { useContext } from 'react';
import { LanguageContext } from '../../App';

interface Props {
    children?: React.ReactNode;
}

const TokiText = ({ children }: Props) => {
    const language = useContext(LanguageContext);
    return language === 'toki' ? <>{children}</> : null;
};

export default TokiText;
