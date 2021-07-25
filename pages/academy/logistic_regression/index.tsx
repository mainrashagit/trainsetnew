import ClassificationNav from '@modules/academy/SubNav/ClassificationNav'
import Container from '@modules/Container/Container'
import A from '@modules/text/A/A'
import ArrowTop from '@modules/text/ArrowTop/ArrowTop'
import Blue from '@modules/text/Blue'
import Center from '@modules/text/Center/Center'
import List from '@modules/text/List/List'
import P from '@modules/text/P/P'
import Section from '@modules/text/Section/Section'
import Title from '@modules/text/Title/Title'
import styles from './index.module.sass'

interface Props { }

const index: React.FC<Props> = ({ }) => {
    return (
        <Container>
            <Title type="h2" margin={true}>TrainSet Academy</Title>
            <ClassificationNav activeLink={2} author={{
                name: "Victor Popov",
                about: ["Feb 29, 2020"],
                img: "/academy/avatar_1.png"
            }} />
            <Title type="h6">Logistic Regression</Title>
            <Section title="1. Introduction">
                <P>Logistic Regression despite the “regression” term in its name is used in <b>classification</b> problems when the dependent (target) variable has two possible outcomes. However, this model can be extended to tackle multiclass classification problems, and we will discuss it at the end of this article.</P>
            </Section>
            <Section title="2. Key Terms">
                <P>Odds are used in Logistic Regression algorithm to model probabilities:</P>
                <Center><img src="/academy/log_1.webp" alt="" /></Center>
                <P>As you can see from formula (1), o d d s ( p ) [ 0 ; ∞ ] given that p ∈ [ 0 ; 1 ] . However, we want our model to take a real value number from [ − ∞ ; ∞ ] (as our features can have any values), and output a soft number in a range [0;1] to describe a probability. Logistic function (also called Sigmoid) possesses all of these traits. It can be derived as an inverse of a log-odds function which is also called <b>logit</b>.</P>
                <Center><img src="/academy/log_2.webp" alt="" /></Center>
                <P>We can achieve the required properties by reflecting the logit function about the line y = x . This transformation can be performed by calculating the inverse of expression (2) which is called a <b>logistic function:</b></P>
                <P>In order to calculate that we should solve the equation:</P>
                <P>Thus, the expression for logistic function (sigmoid function) is the following:</P>
                <Center><img src="/academy/log_3.webp" alt="" /></Center>
            </Section>
            <Section title="3. Model Training">
                <P>Logistic Regression represents logit function as a linear combination of predictors plus the intercept:</P>
                <P>where</P>
                <List>
                    <li>X i is the value of i t h predictor</li>
                    <li>θ i is the generated coefficient</li>
                </List>
                <P>Coefficients θ i indicate the effect of a one-unit change in the predictor variable on the log odds of “success”</P>
                <P>As our train data contains more than one observation, we will denote x as a column vector of the predictors’ values for the particular observation (we will also add 1 as its first element to account for an intercept term) and θ as a column vector of coefficients θ 0. . . θ k :</P>
                <P>Using this notation we can rewrite the expression (4) as follows:</P>
                <P>If we plug in y = θ T x into formula (3), we will get an expression for the probability of a random variable Y (that represents the predicted output) being 0 or 1 given experimental data x and model parameters θ :</P>
                <P>As we are dealing with two class problem, the probability P r ( Y = 0 ∥ x , θ ) can be expressed as follows:</P>
                <P>We can combine probabilities used in expressions (6) and (7) into one formula:</P>
                <P>One can notice that:</P>
                <P>Our goal is to determine the coefficients θ = θ 0 … θ k from formula (4). The intuition here is that for any given train observation we want these coefficients to maximize the probability of observing a correct label. This sentence can be converted to the following formula (assuming train data is independently distributed):</P>
                <P>This expression can be maximized through various optimization techniques such as Newton-Raphson algorithm or a gradient descent (which is usually applied to log-likelihood).</P>
            </Section>
            <Section title="4. Making Predictions">
                <P>Now as we have the vector of model parameters θ we can calculate the predicted value of the logit function for any new observation x (we will use hat symbol for predicted values):</P>
                <P>Then we plug this value into logistic function in order to determine the probability of the data belonging to Class 1 (True, “Yes”, etc):</P>
                <P>The last step is to set up a threshold T (\in) [0;1] that will be used in order to make a prediction:</P>
                <P>By default the threshold is set up to 0.5, but you can adjust it based on your needs (usually based on the True Positive Rate and False Positive Rate trade-off).</P>
                <Center><img src="/academy/log_4.webp" alt="" /></Center>
            </Section>
            <Section title="5. Regularization">
                <P>Regularization means making the model less complex which can allow it to generalize better (i.e. avoid overfitting) and perform better on a new data.</P>
                <P>As was mentioned above, the coefficients of logistic regression are usually fitted by maximizing the log-likelihood. As many optimization techniques are aimed at finding the minimum of a function we can redefine our goal as minimizing the negative log-likelihood:</P>
                <P>We can penalize the model of having coefficients that are far from zero by adding a regularization term R ( θ ) multiplied by parameter λ which is called regularization strength:</P>
                <P>The two most popular regularizations are L1 and L2:</P>
                <P>The factor 1 2 in L2 regularization is used to simplify the derivative calculations. Through λ we can control the impact of the regularization term. Higher values of λ lead to smaller coefficients (less regularization), but too high values can lead to underfitting.</P>
                <P>In scikit-learn package L2 regularization is used by default. Instead of regularization strength λ , its inverse is used: the C parameter (the default is C=1.0). Similarly to λ : smaller values of C leads to smaller coefficients, but too high values can lead to underfitting.</P>
                <P>It is important to normalize the data before performing regularized logistic regression to ensure that the regularization term λ affects the coefficients in a similar manner.</P>
            </Section>
            <Section title="6. Logistic Regression For Multinomial Problems">
                <P>Logistic regression can be generalized to handle problems with more than two possible outcomes. The most popular approach is called “One-vs-Rest” logistic regression where we split our multinomial problem with M classes into M binary classification problems (see Figure 5).</P>
                <Center><img src="/academy/log_5.webp" alt="" /></Center>
                <P>In this case we generate different coefficients θ for each binary classification problem (basically we train M separate Logistic Regression models). When we have to classify a new observation, we calculate the probabilities of the data belonging to each class (which are the outputs of our models) and select the class that has the highest probability.</P>
            </Section>
            <ArrowTop />
        </Container>
    )
}

export default index