import Title from "@modules/text/Title/Title"
import Link from "next/link"
import Section from "@modules/text/Section/Section"
import P from "@modules/text/P/P"
import List from "@modules/text/List/List"
import A from "@modules/text/A/A"
import MinorTitle from "@modules/text/MinorTitle/MinorTitle"
import Author from "@modules/text/Author/Author"
import ArrowTop from "@modules/text/ArrowTop/ArrowTop"
import Sidebar from "@modules/text/Sidebar/Sidebar"
import Container from "@modules/Container/Container"
import Center from "@modules/text/Center/Center"

interface Props { }

const index: React.FC<Props> = ({ }) => {
  return (
    <>
      <Container>
        <Title margin={true}>TrainSet Academy</Title>
        <Sidebar
          items={[
            {
              text: "Cross-Validation the Right Way",
              link: "/blog/cross_validation",
              active: true,
            },
            {
              text: "Running Jupyter Notebooks on Google Cloud",
              link: "/blog/deploy_gcp",
            },
          ]}
        />
        <Title type="h6">Cross-Validation the Right Way</Title>
        <Section title="1. Introduction">
          <P>
            I assume you know the <A to="https://scikit-learn.org/stable/modules/cross_validation.html#cross-validation" target="_blank">basic idea behind Cross-Validation</A> (CV). Here are just a few points that I consider to be important:
          </P>

          <List ol={true}>
            <li>
              CV is widely used for model selection, because it allows you to estimate the performance of the fitted model on unseen data.
            </li>

            <li>
              Typically you want to use:
              <List>
                <li>
                  <A to="https://scikit-learn.org/stable/modules/cross_validation.html#k-fold">KFold CV</A> for <b>regression</b> problems
                </li>

                <li>
                  <A to="https://scikit-learn.org/stable/modules/cross_validation.html#stratified-k-fold" >StratifiedKFold</A> CV for <b>classification</b> problems (especially if the distribution of target labels is not uniform)
                </li>
              </List>
            </li>
          </List>
          <P>
            We will focus entirely on Cross-Validation, eliminating all the other steps of a data science pipeline (such as EDA, pre-processing, etc). Then we will cover some of the methods for performing CV with code samples.
          </P>
        </Section>

        <Section title="2. Dependencies &amp; Dataset">
          <P>In this article we will use <A to="https://www.kaggle.com/vikrishnan/boston-house-prices" >Boston House Prices Dataset</A> which is a good and simple dataset for regression problem.</P>
          <P>Snippet 1. Dependencies &amp; Dataset</P>
          <P> As you can see from Snippet 1, the dataset contains 506 records with 13 features and 1 target variable.</P>
        </Section>

        <Section title="3. Cross-Validation">
          <P>1. It is crucially important, that before moving to CV, you split your data into the train and test sets. In this case, after you are done with model selection, you will be able to get an unbiased estimate of model performance on unseen data.</P>
          <P>2. Often times I see people do all the data preprocessing prior to CV. However, in this case such phenomenon as <A to="https://machinelearningmastery.com/data-leakage-machine-learning/">data leakage</A> can be introduced. The general rule here can be summarized in two points:</P>
          <List ol={true}>
            <li>All the <b>row-wise transformations</b> (when for each transformation you need to know just one value, but not the values of the whole column) can be performed <b>outside CV loop.</b> <span>Examples:</span> converting kilometers to meters; transforming “full_name” into “first_name” and “last_name”.</li>

            <li> All the <b> column-wise transformations </b> (when for each transformation you need to know the values of the whole column) should be performed <b>inside CV loop.</b> <span>Examples:</span> standardization (because you need to calculate mean and standard deviation); rank transformation.</li>
          </List>
          <P>However, <b> transforming data inside CV loop </b> can significantly <b>slow down</b> the whole process. Thus, the smart approach would be to perform as much data preprocessing prior to CV as possible.</P>
          <P>For example, if we look at standardization we need to compute the mean and standard deviation of the whole column. However, if the dataset is big enough and we shuffle the data prior to subsetting it into folds, we can assume that data from different folds come from the same distribution, and thus it has the same mean and standard deviation across different subsets. In this case, even a <b> column-wise transformation </b> can be performed outside CV loop. transformation can be performed outside CV loop.</P>
        </Section>

        <Section title="4. Cross-Validation Methods">
          <P>In this section for simplicity we will stick to just one model (LGBMRegressor) and use cross-validation to select its hyperparameters. For the sake of hyperparameters space visualization we will tune just two parameters (_max_depth_ and _learning_rate)._ We will consider the most popular methods for performing CV as well as some less popular ones that are very powerful.</P>
          <MinorTitle>4.1 Grid Search CV</MinorTitle>
          <P><A to="https://scikit-learn.org/stable/modules/grid_search.html#exhaustive-grid-search" >Grid Search CV</A> performs an exhaustive search over the specified range of hyperparameters (grid). For this method you need to specify every single value for each parameter (which can be tricky, especially for the continuous parameters) that you want your model to try.</P>
          <Center>
            <img src="/academy/grid_search.png" alt="grid_search" />
          </Center>
          <Center><P>Figure 2. Grid Search CV Hyperparameters Space Example</P></Center>

          {/* <script src="https://gist.github.com/v-popov/703a560b5eb6e2a47be4bf74f0590768.js"></script> */}
          <P> Snippet 2. Grid Search CV Code Example</P>
          <P>As you can see from Snippet 2 (cell 11), the best_score has a negative value. It happened because the metric we pass to GridSearchCV is Negative MSE (“neg_mean_squared_error”).</P>
          <P>One of the <b>major downsides</b> of Grid Search CV is that it can be the case, that for example _learning_rate_\=0.45 always leads to terrible performance no matter what values other parameters have, but in the example above the value of _learning_rate_\=0.45 is still used 5 times (see <b>Figure 1</b>) which leads to basically <b> wasting of these 5 trials.</b></P>
          <P>Another <b>disadvantage</b> of Grid Search CV is that it suffers when it comes to dimensionality, as each additional hyperparameter leads to exponential growth of hyperparameters space.</P>
          <MinorTitle>4.2 Randomized Search CV</MinorTitle>
          <P>In contrast to Grid Search CV, <A to="https://scikit-learn.org/stable/modules/grid_search.html#randomized-parameter-optimization" >Randomized Search CV</A> <b>doesn’t set up a grid</b> of hyperparameter values. Instead, we have to <b>specify a distribution</b> for each hyperparameter we want to tune. Randomized Search CV then sample values from these distributions and selects their random combinations. This allows you to explicitly <b>the number of parameter combinations</b> that are attempted. The number of search iterations is set based on time requirements or available resources.</P>

          <Center><img src="/academy/randomized_search.png" alt="randomized_search" /></Center>
          <Center><P>Figure 2. Randomized Search CV Hyperparameters Space Example</P></Center>
          {/* <script src="https://gist.github.com/v-popov/91b57dbeb2dc519f98e5a7f134e5e152.js"></script> */}
          <P>Snippet 3. Randomized Search CV Code Example</P>
          <P>As you can see from Snippet 2 (cell 11), the best_score has a negative value. It happened because the metric we pass to GridSearchCV is Negative MSE (“neg_mean_squared_error”).</P>
          <MinorTitle>4.3 Bayesian Methods</MinorTitle>
          <P>Both Grid Search CV and Randomized Search CV perform different trials independently. That is why the next set of hyperparameters is selected in so-called uninformed manner, meaning we are not using the history of the past trials to select the next set of hyperparameters.</P>
          <P>However, more advanced approaches are using the history of past trials to select hyperparameters for each trial in an informed manner. This often results in the faster hyperparameter tuning process and more accurate resulting models.</P>
          <P>I will provide examples of two of these methods: Hyperopt and Optuna. You can read more about them here and here respectively.</P>
          <MinorTitle>4.3.1 Hyperopt</MinorTitle>
          <Center><img src="/academy/hyperopt.png" alt="hyperopt" /></Center>
          <P>Figure 3. Hyperopt Hyperparameters Space Example</P>
          <P>Take a look at the color bar in the right part of the graph. It indicates the dynamic of hyperparameters combinations selection. You can see that it converges at _max_depth_\=3 and _learning_rate_≈0.20. Note, that for Grid Search CV and Randomized CV we didn’t plot the color bar, because in those cases all the trials were performed independently.</P>
          {/* <script src="https://gist.github.com/v-popov/d17e848bd58513119533a82e2952e4d1.js"></script> */}
          <P>Snippet 4. Hyperopt Code Example</P>
        </Section>

        <Section title="5. Conclusion">
          <P>In this article we’ve discussed some important details about Cross-Validation procedures, as well as some of the most popular methods for performing it. As a bonus for those who were determined enough and made it to the end of the article, here are some useful links:</P>
          <List>
            <li><A to="https://scikit-learn.org/stable/modules/model_evaluation.html#the-scoring-parameter-defining-model-evaluation-rules" > Predefined sklearn evaluation metrics </A>
            </li>
            <li> <A to="https://docs.scipy.org/doc/scipy/reference/stats.html" > Scipy distributions </A>
            </li>
            <li> <A to="https://github.com/hyperopt/hyperopt/wiki/FMin#21-parameter-expressions" > Hyperopt parameter expressions </A>
            </li>
            <li> <A to="https://optuna.readthedocs.io/en/latest/reference/trial.html#optuna.trial.Trial.suggest_categorical" > Optuna suggest options </A>
            </li>
          </List>
        </Section>
        <Section>
          <Author name="Andrew Wolf" about={["May 25, 2020"]} img="/academy/avatar_2.png" imgAlt="Andrew Wolf" />
          <ArrowTop />
        </Section>
      </Container>
    </>
  )
}

export default index
