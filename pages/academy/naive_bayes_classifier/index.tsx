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
            <ClassificationNav activeLink={3} author={{
                name: "Victor Popov",
                about: ["Feb 29, 2020"],
                img: "/academy/avatar_1.png"
            }} />
            <Title type="h6">Naive Bayes Classifier</Title>
            <Section title="1. Introduction">
                <P>Naive Bayes is so ‘naive’ because it assumes that all of the features in a data set are equally important and independent. These assumptions are rarely true in real world scenario, however Naive Bayes algorithm sometimes performs surprisingly well. This is the supervised learning algorithm used for both classification and regression. Its advantage is that it requires very small computational power and as a result works fast even with large data.</P>
            </Section>

            <Section title="2. Key Terms">
                <List>
                    <li>Prior probability is the proportion of dependent variable (target) in the data set.</li>
                    <li>Likelihood is the probability of particular classification a given observation in presence of some other variable.</li>
                    <li>Marginal likelihood is the proportion of independent variable (predictor) in the data set.</li>
                </List>
                <P>These terms might not be clear to you. Let’s dive into an example that shows what exactly Naive Bayes does, with an indication of these terms.</P>
            </Section>

            <Section title="3. Example with Explanation">
                <P>Below I have a training data set of weather and corresponding target variable ‘Play’ (suggesting possibilities of playing). Now, we need to classify whether players will play or not based on weather condition. Let’s follow the below steps to perform Naive Bayes:</P>
                <List>
                    <li>Step 1: Convert the data set into a frequency table (also called contingency table)</li>
                    <li>Step 2: Create Likelihood table.</li>
                    <li>Step 3: Use Naive Bayesian equation to calculate the posterior probability for each class. The class with the highest posterior probability is the outcome of prediction.</li>
                </List>
                <Title type="h6">3.1. Step 1 and Step 2</Title>
                <P>Let’s go over the first two steps. These steps will also help us understand prior probability, likelihood and marginal likelihood.</P>
                <Center><img src="/academy/naive_1.webp" alt="" /></Center>
                <P>The terms Likelihood, Marginal Likelihood, and Prior Probability (or Class Prior Probability, as it is related to classes “Yes” or “No”) that were mentioned above are shown below</P>
                <Center><img src="/academy/naive_2.webp" alt="" /></Center>
                <P>So, we can now see that:</P>
                <List>
                    <li>Likelihood = P (Feature &amp; #124 Class)</li>
                    <li>Marginal Likelihood = P (Feature)</li>
                    <li>Prior Likelihood = P (Class)</li>
                </List>
                <P>Likelihood is just a probability of a feature within a class. For example, if we want to calculate P(Sunny “Yes”), where Sunny is a feature, and “Yes” is a class, we will count all “Yes”es, or all times we went to Play, (and ignore “No”s) when we had “Sunny” weather, divided by the overall observed days in our data set.</P>
                <P>Marginal Likelihood is a probability of a feature. For example, if we want to calculate P(Sunny), we will count all the Sunny days divided by the overall observed days in our data set.</P>
                <P>Prior Likelihood or Class Prior Probability is a probability of a class. For example, if we want to calculate P(“No”), we will count all the “No”s, or, the days we did not go to Play, divided by the overall observed days in our data set.</P>
                <P>Posterior probability is the revised probability of an event occurring after taking into consideration new information. It will be discussed in more details later in this article.</P>
                <Title type="h6">3.2. Step 3</Title>
                <P>Use Bayes’ Formula to calculate the posterior probability for each class. The class with the highest posterior probability is the outcome of prediction.</P>
                <Center><img src="/academy/naive_3.webp" alt="" /></Center>
                <P>In formula above ’c’ denotes class and ’x’ denotes features. Next, let’s look at P(x). As you can see, the denominator contains the only term that is a function of the data (features) - it is not a function of the class we are currently looking at. Thus, it will be the same for all the classes. Traditionally in Naive Bayes Classification, we drop this denominator as it does not impact the final outcome of the classifier in order to make the prediction:</P>
                <P>To make it more interesting, let’s assume we have an the additional feature - Wind:</P>
                <Center><img src="/academy/naive_4.webp" alt="" /></Center>
                <P>Let’s assume we want to predict the class for the data with the following features:</P>
                <P>In order to make a prediction we need to compare posterior probabilities for each class after observing the input data. For this purpose we will use the expression (1). Do not forget, that Naive Bayes assumes independence of features. In order not to inflate our formulas we will use the following notation: ’X1’ for ’Weather’, ’X2’ for ’Wind’ and ’C’ for ’Class’</P>
                <P>First, we estimate the probability for going to Play (i.e. the class = “Yes”) for Wind = Moderate, Weather = Sunny:</P>
                <P>TBD…</P>
            </Section>

            <ArrowTop />
        </Container>
    )
}

export default index