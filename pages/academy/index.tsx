import Title from "@modules/text/Title/Title"
import P from "@modules/text/P/P"
import List from "@modules/text/List/List"
import Section from "@modules/text/Section/Section"
import Author from "@modules/text/Author/Author"
import ArrowTop from "@modules/text/ArrowTop/ArrowTop"
import styles from "./index.module.sass"
import Container from "@modules/Container/Container"
import Nav from "@modules/academy/Nav/Nav"

interface Props { }

const index: React.FC<Props> = ({ }) => {
  return (
    <>
      <Container>
        <Title type="h2" margin={true}>TrainSet Academy</Title>
        <Nav />
        
        <Title type="h6">Overview</Title>

        <P>
          Machine Learning is divided by <b>2</b> sub-fields: <b>supervised</b> and <b>unsupervised</b> learning, both related to data you use to build a model.
        </P>

        <List>
          <li>
            <b>In supervised learning</b>, the data you use is labelled, i.e. it has a target variable you need to predict, given the response variables. For example, predicting price of an apartment, given such variables as: squared footage, number of rooms, district, area, number of schools nearby, etc.
          </li>

          <li>
            <b>In unsupervised learning</b>, the data you use is unlabelled, i.e. it does not have a target variable Y. An example of supervised learning is grouping your customers by segment, based on their characteristics (response variables).
          </li>
        </List>

        <P>
          To get a little bit ahead, let’s view on the ML Mindmap, and further dissect it!
        </P>

        <Title type="h6">Supervised Learning</Title>

        <P>
          Supervised learning is divided into two types of algorithms:
        </P>

        <Section title="Classification algorithms:">
          <P>
            Algorithms that predict a category. Examples can be, an algorithm predicting a movie rating: “Best”, “Good”, “Bad”, “Worst”; an algorithm predicting a fruit: ‘Banana’, ‘Apple’, ‘Orange’; an algorithm predicting any simple yes-no question: “Yes” or “No”, etc.
          </P>
        </Section>

        <Section title="Regression algorithms: algorithms:">
          <P>
            Algorithms that predict a continuous value, such as “dollars” or “weight”. Examples can be, an algorithm predicting a price for the appartment; an algorithm predicting a weight of a person.
          </P>
        </Section>

        <Title type="h6">Unsupervised Learning</Title>

        <P>
          Unsupervised learning is divided into two types of algorithms:
        </P>


        <Section title="Clustering algorithms:">
          <P>
            Algorithms that group data based on common characterists that the model would find in the dataset. Examples can be, an algorithm segmenting customers in a market.
          </P>
        </Section>

        <Section title="Generation algorithms:">
          <P>
            Algorithms that generates data, it mostly related to Natural Language Processing, e.g. generating text.
          </P>
        </Section>
        <P>
          <Author img="/academy/avatar_1.png" name="Andrew Wolf" about={["Feb 29, 2020"]} />
          <ArrowTop />
        </P>
      </Container>
    </>
  )
}

export default index
