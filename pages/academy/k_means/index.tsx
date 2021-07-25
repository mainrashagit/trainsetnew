import ClusteringNav from '@modules/academy/SubNav/ClusteringNav'
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
            <ClusteringNav activeLink={1} author={{
                name: "Victor Popov",
                about: ["Feb 29, 2020"],
                img: "/academy/avatar_2.png"
            }} />
            <Title type="h6">
                K-Means
            </Title>
            <Section title="1. Introduction">
                <P>Labels are an essential ingredient to supervised algorithms like Support Vector Machines, which learns a hypothesis function to predict labels given features. K-means clustering is a type of unsupervised learning, which is used when you have unlabeled data (i.e., data without defined categories/groups/response variables).
                </P>
            </Section>
            <Section title="2. Key Terms">
                <List>
                    <li><b>CLuster:</b> is a collection of data points aggregated together because of certain similarities.</li>
                    <li><b>CLuster Centroid</b> (or simply <b>centroid</b>) is the mean of a cluster, its values are the coordinate-wise average of the data points in this cluster.</li>
                    <li><b>Within-Cluster Varianceis</b> the coordinate-wise squared deviations from the cluster centroid of all the observations belonging to that cluster:</li>
                </List>
                <P>In the expression above denotes j-th predictor of observation ; denotes a set of points belonging to cluster and denotes a centroid of cluster</P>
                <List>
                    <li>Total Within-Cluster Varianceis a within-cluster variance summed up across all clusters:</li>
                </List>
                <P>Note that the notation means the euclidean distance between vectors and</P>
            </Section>
            <Section title="3. Data Representation and Preparation">
                <P>In the formulas above represents a vector in a P-dimensional space and P is a number of predictors in data set. As you can see from the formulas above, K-Means algorithm utilizes the notion of distance between data points and each data point weights equally. In order to calculate the distance, we need our data to be numerical. For this reason, categorical values should be handled (either excluded from the list of predictors or replaced with numerical values). Also, we need to normalize our data in order to avoid the effects of incomparable units and different scaling.</P>
            </Section>
            <Section title="4. Algorithm">
                <P>K-Means algorithm finds cluster centers that minimize the total within-cluster variance . This is achieved in several steps:</P>
                <List>
                    <li><b>Step 1:</b> Randomly generate K centroids</li>
                    <li><b>Step 2:</b> Assign data points to the cluster of the closest centroid:</li>
                    <li><b>Step 3:</b> Compute the mean of each cluster</li>
                    <li><b>Step 4:</b> Reassign centroids to respective clusters’ means computed in Step 3</li>
                    <li><b>Step 5:</b> If the stop criterion is not satisfied: Go to Step 2</li>
                </List>
                <P><b>Stop criterion</b> can be one of the following:</P>
                <List ol={true}>
                    <li>Cluster re-assignation results in same clusters</li>
                    <li>A specified number of iterations is reached</li>
                    <li>Reassigned centroids are located close (need to specify the distance) to the previous centroids</li>
                </List>
                <P>In order to achieve global optima, the algorithm should be run multiple times and clusters’ realization that is observed more often will be our <b>global optima</b>.</P>
                <P>Example: In Figure 1, you can see a K-means algorithm. Training examples are shown as dots, and cluster centroids (K) are shown as crosses. (a) is an original dataset. (b) is a random initial cluster centroids. (c-f) is an illustration of running two iterations of k-means. In each iteration, we assign each training example to the closest cluster centroid (shown by ”painting” the training examples the same color as the cluster centroid to which is assigned); then we move each cluster centroid to the mean of the points assigned to it.</P>
                <Center><img src="/academy/k_1.webp" alt="" /></Center>
            </Section>
            <Section title="5. Choosing K">
                <P>There are three most common ways of selecting the number of clusters K.</P>
                <List ol={true}>
                    <li>Utilize our domain knowledge or any other insight about the data. For instance, we want to cluster flower and we know that our data contains exactly 3 types of flowers. Another example is when we want to cluster cars sold last year. In this case, K will be the number of all car manufacturers available on the market.</li>
                    <li>Run the algorithms several times for different values of K and select such K that results in the smallest value of total within-cluster variance.</li>
                    <li>Perform cross-validation and select such K that performs the best on a hold-out dataset.</li>
                </List>
            </Section>
            <ArrowTop />
        </Container>
    )
}

export default index