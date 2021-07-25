import RegressionNav from '@modules/academy/SubNav/RegressionNav'
import Container from '@modules/Container/Container'
import A from '@modules/text/A/A'
import ArrowTop from '@modules/text/ArrowTop/ArrowTop'
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
            <RegressionNav activeLink={0} author={{
                name: "Victor Popov",
                about: ["Feb 29, 2020"],
                img: "/academy/avatar_1.png"
            }} />
            <Title type="h6">
                Lasso, Ridge &amp; Elastic Net
            </Title>
            <Section title="1. Introduction to Lasso Regularization Term (L1)">
                <P>LASSO - Least Absolute Shrinkage and Selection Operator - was first formulated by Robert Tibshirani in 1996. It is a powerful method that performs two main tasks: regularization and feature selection.</P>
                <P>Let’s look at the example of lasso regularization with linear models, where OLS method is used with its regularization term.</P>
                <Center><img src="/academy/diag_1.webp" alt="" /></Center>
                <P>The LASSO method puts a constraint on the sum of the absolute values of the model parameters, the sum has to be less than a fixed value (upper bound, or t):</P>
                <img src="" alt="" />
                <P>where t is the upper bound for the sum of the coefficients.</P>
                <P>In order to do so, the method applies a shrinking (regularization) process where it penalizes the coefficients of the regression variables shrinking some of them to zero. During features selection process the variables that still have a non-zero coefficient after the shrinking process are selected to be part of the model. The goal of this process is to minimize the prediction error.</P>
            </Section>
            <Section title="2. Parameter">
                <P style={{ width: "100%", textAlign: "center", margin: "1em 0" }}><b><i>α</i></b></P>
                <P>In practice, the tuning parameter α that controls the strength of the penalty assumes great importance. Indeed, when α is sufficiently large, coefficients are forced to be exactly equal to zero. This way, dimensionality can be reduced. The larger the parameter α, the more the number of coefficients are shrunk to zero. On the other hand, if α = 0, we have just an OLS (Ordinary Least Squares) regression.</P>
            </Section>
            <Section title="3. Advanages">
                <P>In practice, the tuning parameter α that controls the strength of the penalty assumes great importance. Indeed, when α is sufficiently large, coefficients are forced to be exactly equal to zero. This way, dimensionality can be reduced. The larger the parameter α, the more the number of coefficients are shrunk to zero. On the other hand, if α = 0, we have just an OLS (Ordinary Least Squares) regression.</P>
                <List>
                    <li>First of all, it can provide a very good prediction accuracy, because shrinking and removing the coefficients can reduce variance without a substantial increase of the bias, this is especially useful when you have a small number of observation and a large number of features. In terms of the tuning parameter α we know that bias increases and variance decreases when α increases, indeed a trade-off between bias and variance has to be found;</li>
                    <li>Moreover, the LASSO helps to increase the model interpretability by eliminating irrelevant variables that are not associated with the response variable, this way also overfitting is reduced. This is the point where we are more interested in because in this paper the focus is on the feature selection task.</li>
                </List>
            </Section>
            <Section title="4. Introduction to Lasso Regression">
                <P>Lasso with linear models is called Lasso Regression. It is the model that describes the relationship between response variable Y and explanatory variables X. In the case of one explanatory variable, Lasso Regression is called Simple Lasso Regression while the case with two or more explanatory variables is called Multiple Lasso Regression.</P>
                <P>Lasso Regression holds all the assumptions of the Linear Regression, such as:</P>
                <List>
                    <li>The response variable is normally distributed;</li>
                    <li>There is a linear relationship between the response variable and the explanatory variables;</li>
                    <li>The random errors are normally distributed, have constant (equal) variances at any point in X, and are independent.</li>
                </List>
                <P><i>To read more about Linear Regression assumptions, go to <A to="https://www.thelearningmachine.ai/cnn">Linear Regression</A></i></P>
            </Section>
            <Section title="5. The Model">
                <P>The LASSO minimizes the sum of squared errors, with an upper bound on the sum of the absolute values of the model parameters. The lasso estimate is defined by the solution to the L1 optimization problem:</P>
                <img src="" alt="" />
                <P>where <b>t</b> is the upper bound for the sum of the coefficients, n is the number of response variables and</P>
                <img src="" alt="" />
                <P>is the parameter that controls the strength of the penalty, the larger the value of α, the greater the amount of shrinkage. This optimization problem is equivalent to the parameter estimation that follows:</P>
                <img src="" alt="" />
                <P>The relation between α and the upper bound t is a reverse relationship. We already know that α controls the strength of the penalty. When α is large, coefficients are forced to be exactly equal to zero, and when α = 0, we have just an OLS (Ordinary Least Squares) method, which estimates parameters.</P>
                <P>When <b>t</b> becomes close to 0, let us say 0.00001 (meaning that the absolute sum of all coefficients should be less than 0.00001), α goes to infinity as it forces coefficients to be exactly 0. On the contrary, as <b>t</b> becomes infinity (meaning that the absolute sum of all coefficients should be less than infinity), α becomes 0, as there is no urgency to shrink coefficients, so the problem becomes just an ordinary least squares.</P>
            </Section>
            <Section title="6. Lasso Regression in Python">
                <P>View/download a template of Lasso Regression located in a git repository <A to="https://github.com/5x12/ML-Cookbook/blob/master/Regression/lasso_regression.ipynb">here</A></P>
            </Section>
            <Title type="h6">Ridge Regression</Title>
            <Section title="1. Introduction to Ridge Regularization Term (L2)">
                <P>Ridge Regression uses OLS method, but with one difference: it has a regularization {"term\alpha \sum_{j=1}^{p}w_{j}^{2}"}(also known as L2 penalty or penalty term).L2 penalty or penalty term</P>
                <P>Ridge Regression allows you to regularize coefficients. This means that the estimated coefficients are pushed towards 0, to make them work better on new data-sets ("optimized for prediction"). This allows you to use complex models and avoid over-fitting at the same time.</P>
                <P>For Ridge Regression you have to set an</P>
                <img src="" alt="" />
                <P>("alpha") - a so-called "meta-parameter" (or "regularization parameter") that defines how aggressive regularization is performed. Alpha simply defines regularization strength and is usually chosen by cross-validation.</P>
                <P>if</P>
                <img src="" alt="" />
                <P>is too large,</P>
                <img src="" alt="" />
                <P>and thus</P>
                <P>causing an underfitting.</P>
                <P>Regularization works especially well when you have a relatively small amount of training data compared to the number of features in a model. It becomes less important as the amount of training data increases.</P>
            </Section>
            <Section title="2. Feature Normalization">
                <P>Feature scaling is very important in Ridge Regression: input variables with different scales will have different contributions to L2 penalty. Transform input features so that L2 penalty is applied more fairly to all features (without weighting some more than others just because of the difference in scales):</P>
                <List>
                    <li>Fit the scaler using the training set, then apply the same scaler to transform the test set;</li>
                    <li>Do not scale the training and test sets using different scalers: this could lead to a random skew in the data;</li>
                    <li>Note that the resulting model and the transferred features may be harder to interpret.</li>
                </List>
            </Section>
            <Section title="3. Ridge Regression in Python">
                <P>View/download a template of Ridge Regression located in a git repository <A to="https://ml-book.com/docs/lasso_ridge_elastic_net#:~:text=View/download%20a%20template%20of%20Ridge%20Regression%20located%20in%20a%20git%20repository%20here">here</A></P>
            </Section>
            <Title type="h6">Ridge VS. Lasso</Title>
            <Section title="1. Introduction">
                <P>In this section, the difference between Lasso and Ridge regression models is outlined. We assume you to know both Ridge and Lasso regressions described above.</P>
                <P>Ridge regression is an extension for linear regression. It’s basically a regularized linear regression model. The</P>
                <img src="" alt="" />
                <P>parameter is a scalar that should be learned as well, using a method called cross-validation.</P>
                <P>An extremely important fact we need to notice about ridge regression is that it enforces the</P>
                <img src="" alt="" />
                <P>coefficients to be lower, but it does not enforce them to be zero. That is, it will not get rid of irrelevant features but rather minimize their impact on the trained model.</P>
                <P>The only difference from Ridge regression is that the regularization term is in <b>absolute value</b>. But this difference has a huge impact on the trade-off we’ve discussed before. Lasso method overcomes the disadvantage of Ridge regression by not only punishing high values of the coefficients β but actually setting them to zero if they are not relevant. Therefore, you might end up with fewer features included in the model than you started with, which is a huge advantage.</P>
                <P>Keep in mind that Ridge regression <b>cannot zero out coefficients;</b> thus, you either end up including all the coefficients in the model or none of them. In contrast, the LASSO does both <b>parameter shrinkage</b> and <b>variable selection automatically</b>. If some of your covariates are highly correlated, you may want to look at the Elastic Net instead of the LASSO.</P>
            </Section>
            <Section title="2. Why Lasso Shrinks Coefficients">
                <P>The main difference between ridge and lasso regression is a shape of their constraint regions. Ridge regression use L2 norm for a constraint. For P= 2 (where P is a number of regressors) case, the shape of the constraint region is a <b>circle</b>. Lasso uses L1 norm for a constraint. For P = 2 case, the shape of the constraint region is a <b>diamond</b>.</P>
                <P>The elliptical contour plot in the figure represents sum of squares error term. The Lasso estimate is an estimate which minimizes the sum of squares as well as satisfies its "diamond" constraint. The Ridge estimate is an estimate which minimizes the sum of squares as well as satisfies its "circle" constraint.</P>
                <P>Thus, the optimal point is a point which is a common point between an ellipse and L1/L2 constraint. This point tries to find the minimum for the constraint that will work for the regression model. Exactly that point gives a minimum value for the Ridge or Lasso function.</P>
                <List>
                    <li>For the LASSO method the constraint region is a diamond, thus it has corners; Because it has corners, there is a high probability that optimum point (minimum point) falls in the corner point of the diamond region. For P=2 case, if an optimal point falls in the corner point, it means that one of the feature estimate is zero.
                        <img src="" alt="" />
                    </li>
                    <li>For the RIDGE method the constraint region is a disk, thus it has no corners and the coefficients cannot be equal to zero, as point minimum will be located elsewhere.</li>
                </List>
            </Section>
            <Title type="h6">Elasic Net</Title>
            <Section title="1. Introduction">
                <P>Elastic Net is a method that includes both Lasso and Ridge.</P>
                <P>The LASSO method has some limitations:</P>
                <List>
                    <li>In small-n-large-p dataset (high-dimensional data with few examples), the LASSO selects at most n variables before it saturates;</li>
                    <li>If there is a group of highly correlated variables, LASSO tends to select one variable from a group and ignore the others.</li>
                </List>
                <P>To overcome these limitations, the elastic net adds a quadratic part to the L1 penalty, which when used alone is a ridge regression (known also as Tikhonov regularization or L2). The estimates from the elastic net method are defined by</P>
                <img src="" alt="" />
                <P><i>where</i></P>
                <img src="" alt="" />
                <P><i>and</i></P>
                <img src="" alt="" />
                <P><i>are two regularization parameters.</i></P>
            </Section>
            <Section title="2. Comparing L1 &amp; L2 with Elastic Net">
                <P>Consider the plots of the abs and square functions.</P>
                <P>When minimizing a loss function with a regularization term, each of the entries in the parameter vector theta are “pulled” down towards zero. Think of each entry in theta lying on one the above curves and being subjected to “gravity” proportional to the regularization hyperparameter k. In the context of L1-regularization, the entries of theta are pulled towards zero proportionally to their absolute values — they lie on the red curve.</P>
            </Section>
            <ArrowTop />
        </Container>
    )
}

export default index