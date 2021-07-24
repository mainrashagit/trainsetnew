import Container from '@modules/Container/Container'
import A from '@modules/text/A/A'
import ArrowTop from '@modules/text/ArrowTop/ArrowTop'
import Blue from '@modules/text/Blue'
import List from '@modules/text/List/List'
import P from '@modules/text/P/P'
import Section from '@modules/text/Section/Section'
import Title from '@modules/text/Title/Title'
import styles from './index.module.sass'

interface Props { }

const index: React.FC<Props> = ({ }) => {
    return (
        <Container>
            <Title type="h6">Decision Tree (ID3)</Title>
            <Section title="1. Introduction">
                <P>There are two types of decision trees:</P>
                <List>
                    <li>Classification tree - used with categorical data: the predicted outcome is the class to which the data belongs. For example, an outcome of a loan application as ‘safe’ or ‘risky’.</li>
                    <li>Regression tree - used with continuous data: the predicted outcome is a real number. For example, a population of a state or inhabitant height in centimeters.</li>
                </List>
                <P>Thus, decision trees can handle both categorical and numerical data. This section conveys decision trees for classification problems. For Regression trees, go <A to="https://ml-book.com/docs/cl_rf/">here</A>.</P>
            </Section>
            <Section title="2. Decision Trees in Classification">
                <P>Decision tree builds classification models in the form of a tree structure. It breaks down a dataset into smaller and smaller subsets by learning a series of explicit if-then rules on feature values that results in predicting a target value.</P>
                <P>A decision tree consists of the decision nodes and leaf nodes. A decision node (Outlook or Wind) has two or more branches (e.g., Sunny, Overcast and Rain). <b>Leaf node</b> (e.g., Play Golf) represents a classification (i.e. decision), and it is an endpoint (last node) of any branch (Yes, No, No, Yes). The topmost decision node in a tree which corresponds to the best predictor called <b>root node</b> (Outlook).</P>
            </Section>
            <Section title="3. ID3 Algorithm">
                <P>There are various decision tree algorithms, namely, ID3 (Iterative Dichotomiser 3), C4.5 (successor of ID3), CART (Classification and Regression Tree), CHAID (Chi-square Automatic Interaction Detector), MARS. This article is about a classification decision tree with ID3 algorithm.</P>
                <P>One of the core algorithms for building decision trees is ID3 by <Blue>J. R. Quinlan</Blue>. ID3 is used to generate a decision tree from a dataset commonly represented by a table. To construct a decision tree, ID3 uses a top-down, greedy search through the given columns, where each column (further called <b>attribute</b>) at every tree node is tested, and selects the attribute that is best for classification of a given set. To decide what attribute is best to select to construct a decision tree, ID3 uses <b>Entropy</b> and <b>Information Gain</b>.</P>
            </Section>
            <Section title="4. Entropy &amp; Information Gain">
                <Title type="h6">Entropy (E)</Title>
                <P>Entropy is the measure of the <b>amount of uncertainty</b> or <b>randomness</b> in data. Intuitively, it shows predictability of a certain event. If an outcome of an event has a probability of 100%, the entropy is zero (no randomness exists), and if an outcome is 50%, the entropy takes the maximum value (i.e. equals to 1 since it is the <Blue>log base 2</Blue>) as it projects perfect randomness. For example, consider a coin toss whose probability of heads is 0.5 and probability of tails is 0.5. The entropy here is the highest possible value (i.e., equals 1), since there’s no chance to precisely determine the outcome. Alternatively, consider a coin which has heads on both the sides, the outcome of such an event can be predicted perfectly since we know beforehand that it will always be heads. In other words, this event has no randomness, hence its entropy is zero. <b>ID3 follows the rule: a branch with an entropy of 0 is a leaf node (endpoint). A branch with an entropy more than 0 needs further splitting.</b> In case it is not possible to achieve zero entropy in the leaf nodes, the decision is made by the method of a <b>simple majority</b>.</P>
                <P>To build a decision tree, we need to calculate two types of entropy using frequency tables as follows:</P>
                <P>1. Entropy E ( S ) using the frequency table of one attribute, where S is a current state (existing outcomes) and P ( x ) is a probability of an event x of that state S :</P>
                <P>2. Entropy E ( S , A ) using the frequency table of two attributes - S and A , where S is a current state with an attribute A (existing outcomes with an attribute A), A is a selected attribute, and P(x) is a probability of an event x of an attribute A.</P>
                <P>E ( S ) is the Entropy of the entire set, while the second term E ( S , A ) relates to an Entropy of an attribute A.</P>
                <Title type="h6">Information Gain (IG)</Title>
                <P>Information gain (also called as Kullback-Leibler divergence) denoted by I G ( S , A ) for a state S is the <b>change in entropy</b> after deciding on a particular attribute A. It measures the relative change (decrease) in entropy with respect to the independent variables, as follows:</P>
                <P>The information gain is based on the decrease in entropy after a dataset is split on an attribute. Constructing a decision tree is all about selecting each attribute ( A ) to calculate Information Gain and finding such an attribute that returns the highest IG (i.e., the most homogeneous branches). This attribute will be the next decision node for the tree.</P>
            </Section>
            <Section title="5. Example">
                <P>Let’s understand this with the help of an example outlined in the beginning.</P>
                <P>Consider a piece of data collected over the course of 14 days where the features are Outlook, Temperature, Humidity, Wind and the outcome variable is whether Golf was played on the day. Now, our job is to build a predictive model which takes in above 4 parameters and predicts whether Golf will be played on the day. We’ll build a decision tree to do that using ID3 algorithm.</P>
                <P>ID3 Algorithm will perform following tasks recursively:</P>
                <List ol={true}>
                    <li>Create a root node for the tree</li>
                    <li>If all examples are positive, return leaf node ‘positive’</li>
                    <li>Else if all examples are negative, return leaf node ‘negative’</li>
                    <li>Calculate the entropy of current state E ( S )</li>
                    <li>For each attribute, calculate the entropy with respect to the attribute ‘A ’ denoted by E ( S , A )</li>
                    <li>Select the attribute which has the maximum value of I G ( S , A ) and split the current (parent) node on the selected attribute</li>
                    <li>Remove the attribute that offers highest I G from the set of attributes</li>
                    <li>Repeat until we run out of all attributes, or the decision tree has all leaf nodes.</li>
                </List>
                <P>Now we’ll go ahead and grow the decision tree. The initial step is to calculate E ( S ) , the Entropy of the current state (i.e. existing outcomes at this stage). In the above example, we can see in total there are 9 Yes’s and 5 No’s.</P>
                <P>Let’s calculate E ( S ) using the formula (1):</P>
                <P>Remember that the Entropy is 0 if all members belong to the same class, and 1 when half of them belong to one class and other half belong to other class, which is perfect randomness. Here it’s 0.94, which means the distribution is <b>fairly random</b>.</P>
                <P>Now the next step is to choose the attribute that gives us highest possible Information Gain which we’ll choose as the root node. Let’s start with ‘Wind’ attribute, calculating its E ( S , W i n d ) and I G ( S , W i n d ) :</P>
                <P>where ‘x’ in P ( x ) are the possible values for an attribute. Here, attribute ‘Wind’ takes two possible values in the sample data.</P>
                <P>Hence, x = W e a k , S t r o n g</P>
                <P>Thus, we have to find the following terms:</P>
                <P>, which we have already calculated</P>
                <P>Amongst all the 14 examples we have 8 places where the wind is Weak and 6 where the wind is <Blue>Strong</Blue>.</P>
                <P>Now out of the 8 Weak examples, 6 of them were ‘Yes’ for Play Golf and 2 of them were ‘No’ for ‘Play Golf’. So, let’s calculate an entropy for “<Blue>Weak”</Blue> values of <Blue>Wind</Blue> attribute:</P>
                <P>Similarly, out of 6 Strong examples, we have 3 examples where the outcome was ‘Yes’ for Play Golf and 3 where we had ‘No’ for Play Golf.</P>
                <P>Remember, here half items belong to one class while other half belong to other. Hence we have perfect randomness.</P>
                <P>Now we have all the pieces required to calculate the Information Gain:</P>
                <P>That tells us the Information Gain by considering ‘Wind’ as the attribute and gives us information gain of 0.048. Now the next step is to choose the attribute that gives us highest possible Information Gain which we’ll choose as the root node. Therefore, we must similarly calculate the Information Gain for all the other attributes and pick the one with the highest score.</P>
                <P>(calculated in a previous example)</P>
                <P>We can clearly see that IG(S, Outlook) has the highest information gain of 0.246, hence we chose Outlook attribute as the root node. At this point, the decision tree looks like:</P>
                <P>Here we observe that whenever the outlook at <Blue>Overcast, Play Golf</Blue> is always ‘Yes’. That means, the entropy is 0 and we can leave “Yes” as a leaf node. The fact that Overcast is always yes is not a coincidence by any chance, the simple tree resulted due to the highest information gain, given by the attribute Outlook.</P>
                <P>Now how do we proceed from this point? We can simply apply recursion: you might want to look at the algorithm steps described earlier.</P>
                <P>Now that we have used Outlook, we have got three of them remaining: <Blue>Humidity, Temperature</Blue>, and <Blue>Wind</Blue>. And, we had three possible values of Outlook: Sunny, Overcast, Rain. Where the Overcast node already ended up having leaf node ‘Yes’, so we’re left with two subtrees to compute: <Blue>Sunny</Blue> and <Blue>Rain</Blue>. Let’s start with <Blue>Sunny</Blue>, and compute its entropy.</P>
                <P>Amongst all the 5 examples the attribute value of Outlook is Sunny, 2 of them were ‘Yes’ for Play Golf and 3 of them were ‘No’ for ‘Play Golf’.</P>
                <P>In the similar fashion, we compute the following values:</P>
                <P>As we can see the highest Information Gain is given by <b>Humidity</b>. Proceeding in the same way with S r a i n will give us <Blue>Wind</Blue> as the one with <Blue>highest information gain</Blue>.</P>
                <P>The final Decision Tree is going to be looked as such:</P>
            </Section>
            <Section title="6. Summary">
                <P>A decision tree is built top-down from a root node and involves partitioning the data into subsets that contain instances with similar values (homogenous). ID3 algorithm uses entropy to calculate the homogeneity of a sample. If the sample is completely homogeneous, the entropy is zero and if the sample is an equally divided it has an entropy of one.</P>
                <P>The information gain is based on the decrease in entropy after a dataset is split on an attribute. Constructing a decision tree is all about finding an attribute that returns the highest information gain (i.e. the most homogeneous branches, or the lowest entropy). After that, all the outcome instances that are possible are examined whether they belong to the same class or not. For the instances of the same class, a single name class is used to denote otherwise the instances are classified on the basis of splitting attribute.</P>
            </Section>
            <Section title="7. Overfitting and Pruning">
                <P>One of the most common problems with decision trees, especially the ones that have a table full of columns, is that they tend to <b>overfit</b> a lot. Sometimes it looks like the tree just <Blue>memorizes</Blue> the data. Here are the typical examples of decision trees that overfit, both for categorical and continuous data:</P>
                <P>Categorical: <Blue>If the client is male, between 15 and 25, from the US, likes ice-cream, has a German friend, hates birds and ate pancakes on August 25th, 2012, - he is likely to download Pokemon Go</Blue>.</P>
                <P>There are two main ways to mitigate overfitting in Decision Trees:</P>
                <List ol={true}>
                    <li>Using Random Forests</li>
                    <li>Pruning Decision Trees</li>
                </List>
                <P>Random Forest prevents the problem of overfitting as it is an ensemble of (<Blue>n</Blue>) decision trees, not just one, with <Blue>n</Blue> results in the end. The final result of Random forest is the most frequent response variable (the mode) among n results (of <Blue>n</Blue> Decision Trees). We will not explain this algorithm in this section. It is a separate algorithm and you can read the article on it <A to="https://ml-book.com/docs/cl_rf/">here</A> in detail.</P>
                <P>Pruning involves the removal of nodes and branches in a decision tree to make it simpler so as to mitigate overfitting and improve performance. Ideally, we want the leaf nodes to be as little randomized as possible for high accuracy, but it is very easy to overfit, so much so, that in many cases, the leaf nodes may only have a single data point. We can mitigate this by pruning the decision tree by a method called <b>cost-effective pruning</b>.</P>
                <P>The following algorithm takes place while applying cost-effective pruning:</P>
                <P>Determine the performance of the original tree, T, with the validation data</P>
                <P>Consider a sub-tree, t(1), and remove it from the original tree, replacing a sub-tree with a leaf.</P>
                <P>Determine the performance of a new tree, T(new).</P>
                <P>If the delta in performance is insignificant (that is, if validation set does not have the significant difference in delta performance), consider simpler (pruned) tree (Occam’s razor) as an original, and continue to the next sub-tree.</P>
                <P>number of leaves</P>
                <P>Original tree T</P>
            </Section>
            <Section title="8. Pros &amp; Cons​">
                <Title type="h6">Advantages of ID3</Title>
                <List ol={true}>
                    <li>Easily visualized and interpreted. The training data is used to create understandable prediction rules.</li>
                    <li>No feature normalization is typically needed.</li>
                    <li>The calculation time of ID3 is the linear function of the product of the characteristic number and node number.</li>
                    <li>Works well with datasets using a mixture of feature types (continuous/categorical/binary)</li>
                </List>
                <Title type="h6">Disadvantages of ID3</Title>
                <List ol={true}>
                    <li>Data may be overfitted or overclassified.</li>
                    <li>No feature normalization is typically needed.</li>
                    <li>For making a decision, only one attribute is tested at an instant thus consuming a lot of time.</li>
                    <li>Classifying the continuous data may prove to be expensive in terms of computation, as many trees have to be generated to see where to break the continuum. One disadvantage of ID3 is that when given a large number of input values, it is overly sensitive to features with a large number of values.</li>
                </List>
            </Section>
            <Section title="9. Decision Tree in Python"><P>View/download a template of Decision Tree located in a git repository here.</P></Section>
            <ArrowTop />
        </Container>
    )
}

export default index