import styles from './index.module.sass'
import { MathJax, MathJaxContext } from "better-react-mathjax";

interface Props { }

const Math: React.FC<Props> = ({ children }) => {
    return (
        <MathJaxContext>
            <MathJax style={{ fontSize: "1.5em" }}>
                <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
                    {children}
                </math>
            </MathJax>
        </MathJaxContext>
    )
}

export default Math