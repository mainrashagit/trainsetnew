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
import Math from '@modules/text/Math/Math'

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
                <Center><Math>
                    <mi>o</mi>
                    <mi>d</mi>
                    <mi>d</mi>
                    <mi>s</mi>
                    <mo stretchy="false">(</mo>
                    <mi>p</mi>
                    <mo stretchy="false">)</mo>
                    <mo>=</mo>
                    <mfrac>
                        <mi>p</mi>
                        <mrow>
                            <mn>1</mn>
                            <mo>&#x2212;</mo>
                            <mi>p</mi>
                        </mrow>
                    </mfrac>
                    <mo>=</mo>
                    <mfrac>
                        <mrow>
                            <mi>P</mi>
                            <mi>r</mi>
                            <mi>o</mi>
                            <mi>b</mi>
                            <mo stretchy="false">(</mo>
                            <mi>C</mi>
                            <mi>l</mi>
                            <mi>a</mi>
                            <mi>s</mi>
                            <mi>s</mi>
                            <mtext>&#xA0;</mtext>
                            <mn>1</mn>
                            <mo stretchy="false">)</mo>
                        </mrow>
                        <mrow>
                            <mi>P</mi>
                            <mi>r</mi>
                            <mi>o</mi>
                            <mi>b</mi>
                            <mo stretchy="false">(</mo>
                            <mi>C</mi>
                            <mi>l</mi>
                            <mi>a</mi>
                            <mi>s</mi>
                            <mi>s</mi>
                            <mtext>&#xA0;</mtext>
                            <mn>2</mn>
                            <mo stretchy="false">)</mo>
                        </mrow>
                    </mfrac>
                    <mo>=</mo>
                    <mfrac>
                        <mrow>
                            <mi>P</mi>
                            <mi>r</mi>
                            <mi>o</mi>
                            <mi>b</mi>
                            <mo stretchy="false">(</mo>
                            <mi>T</mi>
                            <mi>r</mi>
                            <mi>u</mi>
                            <mi>e</mi>
                            <mo stretchy="false">)</mo>
                        </mrow>
                        <mrow>
                            <mi>P</mi>
                            <mi>r</mi>
                            <mi>o</mi>
                            <mi>b</mi>
                            <mo stretchy="false">(</mo>
                            <mi>F</mi>
                            <mi>a</mi>
                            <mi>l</mi>
                            <mi>s</mi>
                            <mi>e</mi>
                            <mo stretchy="false">)</mo>
                        </mrow>
                    </mfrac>
                    <mo>=</mo>
                    <mfrac>
                        <mrow>
                            <mi>P</mi>
                            <mi>r</mi>
                            <mi>o</mi>
                            <mi>b</mi>
                            <mo stretchy="false">(</mo>
                            <mo>&quot;</mo>
                            <mi>Y</mi>
                            <mi>e</mi>
                            <mi>s</mi>
                            <mo>&quot;</mo>
                            <mo stretchy="false">)</mo>
                        </mrow>
                        <mrow>
                            <mi>P</mi>
                            <mi>r</mi>
                            <mi>o</mi>
                            <mi>b</mi>
                            <mo stretchy="false">(</mo>
                            <mo>&quot;</mo>
                            <mi>N</mi>
                            <mi>o</mi>
                            <mo>&quot;</mo>
                            <mo stretchy="false">)</mo>
                        </mrow>
                    </mfrac>
                    <mspace width="1em" />
                    <mo stretchy="false">(</mo>
                    <mn>1</mn>
                    <mo stretchy="false">)</mo>
                </Math></Center>
                <Center><img src="/academy/log_1.webp" alt="" /></Center>
                <P>As you can see from formula (1), o d d s ( p ) [ 0 ; ∞ ] given that p ∈ [ 0 ; 1 ] . However, we want our model to take a real value number from [ − ∞ ; ∞ ] (as our features can have any values), and output a soft number in a range [0;1] to describe a probability. Logistic function (also called Sigmoid) possesses all of these traits. It can be derived as an inverse of a log-odds function which is also called <b>logit</b>.</P>
                <Center><Math>
                    <mi>l</mi>
                    <mi>o</mi>
                    <mi>g</mi>
                    <mi>i</mi>
                    <mi>t</mi>
                    <mo stretchy="false">(</mo>
                    <mi>p</mi>
                    <mo stretchy="false">)</mo>
                    <mo>=</mo>
                    <mi>l</mi>
                    <mi>o</mi>
                    <mi>g</mi>
                    <mo stretchy="false">(</mo>
                    <mi>o</mi>
                    <mi>d</mi>
                    <mi>d</mi>
                    <mi>s</mi>
                    <mo stretchy="false">(</mo>
                    <mi>p</mi>
                    <mo stretchy="false">)</mo>
                    <mo stretchy="false">)</mo>
                    <mo>=</mo>
                    <mi>l</mi>
                    <mi>o</mi>
                    <mi>g</mi>
                    <mo stretchy="false">(</mo>
                    <mfrac>
                        <mi>p</mi>
                        <mrow>
                            <mn>1</mn>
                            <mo>&#x2212;</mo>
                            <mi>p</mi>
                        </mrow>
                    </mfrac>
                    <mo stretchy="false">)</mo>
                    <mspace width="1em" />
                    <mo stretchy="false">(</mo>
                    <mn>2</mn>
                    <mo stretchy="false">)</mo>
                </Math></Center>
                <Center><img src="/academy/log_2.webp" alt="" /></Center>
                <P>We can achieve the required properties by reflecting the logit function about the line y = x . This transformation can be performed by calculating the inverse of expression (2) which is called a <b>logistic function:</b></P>
                <Center><Math>
                    <mi>l</mi>
                    <mi>o</mi>
                    <mi>g</mi>
                    <mi>i</mi>
                    <mi>s</mi>
                    <mi>t</mi>
                    <mi>i</mi>
                    <mi>c</mi>
                    <mo stretchy="false">(</mo>
                    <mi>y</mi>
                    <mo stretchy="false">)</mo>
                    <mo>=</mo>
                    <mi>l</mi>
                    <mi>o</mi>
                    <mi>g</mi>
                    <mi>i</mi>
                    <mi>t</mi>
                    <mo stretchy="false">(</mo>
                    <mi>p</mi>
                    <msup>
                        <mo stretchy="false">)</mo>
                        <mrow class="MJX-TeXAtom-ORD">
                            <mo>&#x2212;</mo>
                            <mn>1</mn>
                        </mrow>
                    </msup>
                </Math></Center>
                <P>In order to calculate that we should solve the equation:</P>
                <Center><Math>
                    <mi>l</mi>
                    <mi>o</mi>
                    <mi>g</mi>
                    <mi>i</mi>
                    <mi>t</mi>
                    <mo stretchy="false">(</mo>
                    <mi>p</mi>
                    <mo stretchy="false">)</mo>
                    <mo>=</mo>
                    <mi>y</mi>
                    <mo stretchy="false">&#x2192;</mo>
                    <mi>l</mi>
                    <mi>o</mi>
                    <mi>g</mi>
                    <mo stretchy="false">(</mo>
                    <mfrac>
                        <mi>p</mi>
                        <mrow>
                            <mn>1</mn>
                            <mo>&#x2212;</mo>
                            <mi>p</mi>
                        </mrow>
                    </mfrac>
                    <mo stretchy="false">)</mo>
                    <mo>=</mo>
                    <mi>y</mi>
                    <mo stretchy="false">&#x2192;</mo>
                    <mfrac>
                        <mi>p</mi>
                        <mrow>
                            <mn>1</mn>
                            <mo>&#x2212;</mo>
                            <mi>p</mi>
                        </mrow>
                    </mfrac>
                    <mo>=</mo>
                    <msup>
                        <mi>e</mi>
                        <mi>y</mi>
                    </msup>
                    <mo stretchy="false">&#x2192;</mo>
                    <mi>p</mi>
                    <mo>=</mo>
                    <msup>
                        <mi>e</mi>
                        <mi>y</mi>
                    </msup>
                    <mo stretchy="false">(</mo>
                    <mn>1</mn>
                    <mo>&#x2212;</mo>
                    <mi>p</mi>
                    <mo stretchy="false">)</mo>
                    <mo stretchy="false">&#x2192;</mo>
                    <mi>p</mi>
                    <mo stretchy="false">(</mo>
                    <msup>
                        <mi>e</mi>
                        <mi>y</mi>
                    </msup>
                    <mo>+</mo>
                    <mn>1</mn>
                    <mo stretchy="false">)</mo>
                    <mo>=</mo>
                    <msup>
                        <mi>e</mi>
                        <mi>y</mi>
                    </msup>
                    <mspace linebreak="newline" />
                    <mi>p</mi>
                    <mo>=</mo>
                    <mfrac>
                        <msup>
                            <mi>e</mi>
                            <mi>y</mi>
                        </msup>
                        <mrow>
                            <msup>
                                <mi>e</mi>
                                <mi>y</mi>
                            </msup>
                            <mo>+</mo>
                            <mn>1</mn>
                        </mrow>
                    </mfrac>
                    <mo>=</mo>
                    <mfrac>
                        <mn>1</mn>
                        <mrow>
                            <mn>1</mn>
                            <mo>+</mo>
                            <msup>
                                <mi>e</mi>
                                <mrow class="MJX-TeXAtom-ORD">
                                    <mo>&#x2212;</mo>
                                    <mi>y</mi>
                                </mrow>
                            </msup>
                        </mrow>
                    </mfrac>
                </Math></Center>
                <P>Thus, the expression for logistic function (sigmoid function) is the following:</P>
                <Center><Math>
                    <mi>l</mi>
                    <mi>o</mi>
                    <mi>g</mi>
                    <mi>i</mi>
                    <mi>s</mi>
                    <mi>t</mi>
                    <mi>i</mi>
                    <mi>c</mi>
                    <mo stretchy="false">(</mo>
                    <mi>y</mi>
                    <mo stretchy="false">)</mo>
                    <mo>=</mo>
                    <mfrac>
                        <mn>1</mn>
                        <mrow>
                            <mn>1</mn>
                            <mo>+</mo>
                            <msup>
                                <mi>e</mi>
                                <mrow class="MJX-TeXAtom-ORD">
                                    <mo>&#x2212;</mo>
                                    <mi>y</mi>
                                </mrow>
                            </msup>
                        </mrow>
                    </mfrac>
                    <mspace width="1em" />
                    <mo stretchy="false">(</mo>
                    <mn>3</mn>
                    <mo stretchy="false">)</mo>
                </Math></Center>
                <Center><img src="/academy/log_3.webp" alt="" /></Center>
            </Section>
            <Section title="3. Model Training">
                <P>Logistic Regression represents logit function as a linear combination of predictors plus the intercept:</P>
                <Center><Math>
                    <mi>l</mi>
                    <mi>o</mi>
                    <mi>g</mi>
                    <mi>i</mi>
                    <mi>t</mi>
                    <mo stretchy="false">(</mo>
                    <mi>p</mi>
                    <mo stretchy="false">)</mo>
                    <mo>=</mo>
                    <msub>
                        <mi>&#x3B8;</mi>
                        <mn>0</mn>
                    </msub>
                    <mo>+</mo>
                    <msub>
                        <mi>&#x3B8;</mi>
                        <mn>1</mn>
                    </msub>
                    <msub>
                        <mi>X</mi>
                        <mn>1</mn>
                    </msub>
                    <mo>+</mo>
                    <msub>
                        <mi>&#x3B8;</mi>
                        <mn>2</mn>
                    </msub>
                    <msub>
                        <mi>X</mi>
                        <mn>2</mn>
                    </msub>
                    <mo>+</mo>
                    <mo>.</mo>
                    <mo>.</mo>
                    <mo>.</mo>
                    <mo>+</mo>
                    <msub>
                        <mi>&#x3B8;</mi>
                        <mi>k</mi>
                    </msub>
                    <msub>
                        <mi>X</mi>
                        <mi>k</mi>
                    </msub>
                    <mo>,</mo>
                    <mspace width="1em" />
                    <mo stretchy="false">(</mo>
                    <mn>4</mn>
                    <mo stretchy="false">)</mo>
                </Math></Center>
                <P>where</P>
                <List>
                    <li>X i is the value of i t h predictor</li>
                    <li>θ i is the generated coefficient</li>
                </List>
                <P>Coefficients θ i indicate the effect of a one-unit change in the predictor variable on the log odds of “success”</P>
                <P>As our train data contains more than one observation, we will denote x as a column vector of the predictors’ values for the particular observation (we will also add 1 as its first element to account for an intercept term) and θ as a column vector of coefficients θ 0. . . θ k :</P>
                <Center><Math>
                    <mi>x</mi>
                    <mo>=</mo>
                    <mrow>
                        <mo>[</mo>
                        <mtable columnalign="center center center" rowspacing="4pt" columnspacing="1em">
                            <mtr>
                                <mtd>
                                    <mn>1</mn>
                                </mtd>
                            </mtr>
                            <mtr>
                                <mtd>
                                    <msub>
                                        <mi>X</mi>
                                        <mrow class="MJX-TeXAtom-ORD">
                                            <mn>1</mn>
                                        </mrow>
                                    </msub>
                                </mtd>
                            </mtr>
                            <mtr>
                                <mtd>
                                    <msub>
                                        <mi>X</mi>
                                        <mrow class="MJX-TeXAtom-ORD">
                                            <mn>2</mn>
                                        </mrow>
                                    </msub>
                                </mtd>
                            </mtr>
                            <mtr>
                                <mtd>
                                    <mo>.</mo>
                                    <mo>.</mo>
                                    <mo>.</mo>
                                </mtd>
                            </mtr>
                            <mtr>
                                <mtd>
                                    <msub>
                                        <mi>X</mi>
                                        <mrow class="MJX-TeXAtom-ORD">
                                            <mi>k</mi>
                                        </mrow>
                                    </msub>
                                </mtd>
                            </mtr>
                        </mtable>
                        <mo>]</mo>
                    </mrow>
                    <mo>;</mo>
                    <mspace width="2em" />
                    <mi>&#x3B8;</mi>
                    <mo>=</mo>
                    <mrow>
                        <mo>[</mo>
                        <mtable columnalign="center center center" rowspacing="4pt" columnspacing="1em">
                            <mtr>
                                <mtd>
                                    <msub>
                                        <mi>&#x3B8;</mi>
                                        <mn>0</mn>
                                    </msub>
                                </mtd>
                            </mtr>
                            <mtr>
                                <mtd>
                                    <msub>
                                        <mi>&#x3B8;</mi>
                                        <mn>1</mn>
                                    </msub>
                                </mtd>
                            </mtr>
                            <mtr>
                                <mtd>
                                    <msub>
                                        <mi>&#x3B8;</mi>
                                        <mn>2</mn>
                                    </msub>
                                </mtd>
                            </mtr>
                            <mtr>
                                <mtd>
                                    <mo>.</mo>
                                    <mo>.</mo>
                                    <mo>.</mo>
                                </mtd>
                            </mtr>
                            <mtr>
                                <mtd>
                                    <msub>
                                        <mi>&#x3B8;</mi>
                                        <mi>k</mi>
                                    </msub>
                                </mtd>
                            </mtr>
                        </mtable>
                        <mo>]</mo>
                    </mrow>
                </Math></Center>
                <P>Using this notation we can rewrite the expression (4) as follows:</P>
                <Center><Math>
                    <mi>l</mi>
                    <mi>o</mi>
                    <mi>g</mi>
                    <mi>i</mi>
                    <mi>t</mi>
                    <mo stretchy="false">(</mo>
                    <mi>p</mi>
                    <mo stretchy="false">)</mo>
                    <mo>=</mo>
                    <msup>
                        <mi>&#x3B8;</mi>
                        <mi>T</mi>
                    </msup>
                    <mi>x</mi>
                    <mspace width="1em" />
                    <mo stretchy="false">(</mo>
                    <mn>5</mn>
                    <mo stretchy="false">)</mo>
                </Math></Center>
                <P>If we plug in y = θ T x into formula (3), we will get an expression for the probability of a random variable Y (that represents the predicted output) being 0 or 1 given experimental data x and model parameters θ :</P>
                <Center>
                    <Math>
                        <mi>P</mi>
                        <mi>r</mi>
                        <mo stretchy="false">(</mo>
                        <mi>Y</mi>
                        <mo>=</mo>
                        <mn>1</mn>
                        <mrow class="MJX-TeXAtom-ORD">
                            <mo stretchy="false">|</mo>
                        </mrow>
                        <mi>x</mi>
                        <mo>,</mo>
                        <mi>&#x3B8;</mi>
                        <mo stretchy="false">)</mo>
                        <mo>=</mo>
                        <mfrac>
                            <mn>1</mn>
                            <mrow>
                                <mn>1</mn>
                                <mo>+</mo>
                                <msup>
                                    <mi>e</mi>
                                    <mrow class="MJX-TeXAtom-ORD">
                                        <mo>&#x2212;</mo>
                                        <msup>
                                            <mi>&#x3B8;</mi>
                                            <mi>T</mi>
                                        </msup>
                                        <mi>x</mi>
                                    </mrow>
                                </msup>
                            </mrow>
                        </mfrac>
                        <mspace width="1em" />
                        <mo stretchy="false">(</mo>
                        <mn>6</mn>
                        <mo stretchy="false">)</mo>
                    </Math>
                </Center>
                <P>As we are dealing with two class problem, the probability P r ( Y = 0 ∥ x , θ ) can be expressed as follows:</P>
                <Center><Math>
                    <mi>P</mi>
                    <mi>r</mi>
                    <mo stretchy="false">(</mo>
                    <mi>Y</mi>
                    <mo>=</mo>
                    <mn>0</mn>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <mi>x</mi>
                    <mo>,</mo>
                    <mi>&#x3B8;</mi>
                    <mo stretchy="false">)</mo>
                    <mo>=</mo>
                    <mn>1</mn>
                    <mo>&#x2212;</mo>
                    <mi>P</mi>
                    <mi>r</mi>
                    <mo stretchy="false">(</mo>
                    <mi>Y</mi>
                    <mo>=</mo>
                    <mn>1</mn>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <mi>x</mi>
                    <mo>,</mo>
                    <mi>&#x3B8;</mi>
                    <mo stretchy="false">)</mo>
                    <mspace width="1em" />
                    <mo stretchy="false">(</mo>
                    <mn>7</mn>
                    <mo stretchy="false">)</mo>
                </Math></Center>
                <P>We can combine probabilities used in expressions (6) and (7) into one formula:</P>
                <Center><Math>
                    <mi>P</mi>
                    <mi>r</mi>
                    <mo stretchy="false">(</mo>
                    <mi>Y</mi>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <mi>x</mi>
                    <mo>,</mo>
                    <mi>&#x3B8;</mi>
                    <mo stretchy="false">)</mo>
                    <mo>=</mo>
                    <mi>P</mi>
                    <mi>r</mi>
                    <mo stretchy="false">(</mo>
                    <mi>Y</mi>
                    <mo>=</mo>
                    <mn>1</mn>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <mi>x</mi>
                    <mo>,</mo>
                    <mi>&#x3B8;</mi>
                    <msup>
                        <mo stretchy="false">)</mo>
                        <mrow class="MJX-TeXAtom-ORD">
                            <mi>Y</mi>
                        </mrow>
                    </msup>
                    <mo stretchy="false">(</mo>
                    <mn>1</mn>
                    <mo>&#x2212;</mo>
                    <mi>P</mi>
                    <mi>r</mi>
                    <mo stretchy="false">(</mo>
                    <mi>Y</mi>
                    <mo>=</mo>
                    <mn>1</mn>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <mi>x</mi>
                    <mo>,</mo>
                    <mi>&#x3B8;</mi>
                    <mo stretchy="false">)</mo>
                    <msup>
                        <mo stretchy="false">)</mo>
                        <mrow class="MJX-TeXAtom-ORD">
                            <mn>1</mn>
                            <mo>&#x2212;</mo>
                            <mi>Y</mi>
                        </mrow>
                    </msup>
                    <mspace width="1em" />
                    <mo stretchy="false">(</mo>
                    <mn>8</mn>
                    <mo stretchy="false">)</mo>
                </Math></Center>
                <P>One can notice that:</P>
                <Center><Math>
                    <mi>P</mi>
                    <mi>r</mi>
                    <mo stretchy="false">(</mo>
                    <mi>Y</mi>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <mi>x</mi>
                    <mo>,</mo>
                    <mi>&#x3B8;</mi>
                    <mo stretchy="false">)</mo>
                    <mo stretchy="false">&#x2192;</mo>
                    <mi>P</mi>
                    <mi>r</mi>
                    <mo stretchy="false">(</mo>
                    <mi>Y</mi>
                    <mo>=</mo>
                    <mn>1</mn>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <mi>x</mi>
                    <mo>,</mo>
                    <mi>&#x3B8;</mi>
                    <mo stretchy="false">)</mo>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mtext>&#xA0;</mtext>
                        <mi mathvariant="normal">g</mi>
                        <mi mathvariant="normal">i</mi>
                        <mi mathvariant="normal">v</mi>
                        <mi mathvariant="normal">e</mi>
                        <mi mathvariant="normal">n</mi>
                        <mtext>&#xA0;</mtext>
                        <mi mathvariant="normal">Y</mi>
                        <mo>=</mo>
                        <mn>1</mn>
                    </mrow>
                    <mo>,</mo>
                    <mtext>&#xA0;</mtext>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mi mathvariant="normal">a</mi>
                        <mi mathvariant="normal">n</mi>
                        <mi mathvariant="normal">d</mi>
                    </mrow>
                    <mspace linebreak="newline" />
                    <mi>P</mi>
                    <mi>r</mi>
                    <mo stretchy="false">(</mo>
                    <mi>Y</mi>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <mi>x</mi>
                    <mo>,</mo>
                    <mi>&#x3B8;</mi>
                    <mo stretchy="false">)</mo>
                    <mo stretchy="false">&#x2192;</mo>
                    <mn>1</mn>
                    <mo>&#x2212;</mo>
                    <mi>P</mi>
                    <mi>r</mi>
                    <mo stretchy="false">(</mo>
                    <mi>Y</mi>
                    <mo>=</mo>
                    <mn>1</mn>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <mi>x</mi>
                    <mo>,</mo>
                    <mi>&#x3B8;</mi>
                    <mo stretchy="false">)</mo>
                    <mo>=</mo>
                    <mi>P</mi>
                    <mi>r</mi>
                    <mo stretchy="false">(</mo>
                    <mi>Y</mi>
                    <mo>=</mo>
                    <mn>0</mn>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <mi>x</mi>
                    <mo>,</mo>
                    <mi>&#x3B8;</mi>
                    <mo stretchy="false">)</mo>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mtext>&#xA0;</mtext>
                        <mi mathvariant="normal">g</mi>
                        <mi mathvariant="normal">i</mi>
                        <mi mathvariant="normal">v</mi>
                        <mi mathvariant="normal">e</mi>
                        <mi mathvariant="normal">n</mi>
                        <mtext>&#xA0;</mtext>
                        <mi mathvariant="normal">Y</mi>
                        <mo>=</mo>
                        <mn>0</mn>
                    </mrow>
                    <mo>.</mo>
                </Math></Center>
                <P>Our goal is to determine the coefficients θ = θ 0 … θ k from formula (4). The intuition here is that for any given train observation we want these coefficients to maximize the probability of observing a correct label. This sentence can be converted to the following formula (assuming train data is independently distributed):</P>
                <Center><Math>
                    <mi>L</mi>
                    <mo stretchy="false">(</mo>
                    <mi>&#x3B8;</mi>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <mi>x</mi>
                    <mo stretchy="false">)</mo>
                    <mo>=</mo>
                    <mi>P</mi>
                    <mi>r</mi>
                    <mo stretchy="false">(</mo>
                    <mi>Y</mi>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <mi>x</mi>
                    <mo>,</mo>
                    <mi>&#x3B8;</mi>
                    <mo stretchy="false">)</mo>
                    <mo stretchy="false">&#x2192;</mo>
                    <mi>m</mi>
                    <mi>a</mi>
                    <mi>x</mi>
                    <mo>,</mo>
                    <mspace linebreak="newline" />
                    <mrow class="MJX-TeXAtom-ORD">
                        <mi mathvariant="normal">w</mi>
                        <mi mathvariant="normal">h</mi>
                        <mi mathvariant="normal">e</mi>
                        <mi mathvariant="normal">r</mi>
                        <mi mathvariant="normal">e</mi>
                    </mrow>
                    <mtext>&#xA0;</mtext>
                    <mi>P</mi>
                    <mi>r</mi>
                    <mo stretchy="false">(</mo>
                    <mi>Y</mi>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <mi>x</mi>
                    <mo>,</mo>
                    <mi>&#x3B8;</mi>
                    <mo stretchy="false">)</mo>
                    <mo>=</mo>
                    <munderover>
                        <mo>&#x220F;</mo>
                        <mrow class="MJX-TeXAtom-ORD">
                            <mi>i</mi>
                            <mo>=</mo>
                            <mn>1</mn>
                        </mrow>
                        <mrow class="MJX-TeXAtom-ORD">
                            <mi>n</mi>
                        </mrow>
                    </munderover>
                    <mi>P</mi>
                    <mi>r</mi>
                    <mo stretchy="false">(</mo>
                    <msub>
                        <mi>y</mi>
                        <mi>i</mi>
                    </msub>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <msub>
                        <mi>x</mi>
                        <mi>i</mi>
                    </msub>
                    <mo>,</mo>
                    <mi>&#x3B8;</mi>
                    <mo stretchy="false">)</mo>
                    <mo>=</mo>
                    <munderover>
                        <mo>&#x220F;</mo>
                        <mrow class="MJX-TeXAtom-ORD">
                            <mi>i</mi>
                            <mo>=</mo>
                            <mn>1</mn>
                        </mrow>
                        <mrow class="MJX-TeXAtom-ORD">
                            <mi>n</mi>
                        </mrow>
                    </munderover>
                    <mi>P</mi>
                    <mi>r</mi>
                    <mo stretchy="false">(</mo>
                    <msub>
                        <mi>y</mi>
                        <mi>i</mi>
                    </msub>
                    <mo>=</mo>
                    <mn>1</mn>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <msub>
                        <mi>x</mi>
                        <mi>i</mi>
                    </msub>
                    <mo>,</mo>
                    <mi>&#x3B8;</mi>
                    <msup>
                        <mo stretchy="false">)</mo>
                        <mrow class="MJX-TeXAtom-ORD">
                            <msub>
                                <mi>y</mi>
                                <mi>i</mi>
                            </msub>
                        </mrow>
                    </msup>
                    <mo stretchy="false">(</mo>
                    <mn>1</mn>
                    <mo>&#x2212;</mo>
                    <mi>P</mi>
                    <mi>r</mi>
                    <mo stretchy="false">(</mo>
                    <msub>
                        <mi>y</mi>
                        <mi>i</mi>
                    </msub>
                    <mo>=</mo>
                    <mn>1</mn>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <msub>
                        <mi>x</mi>
                        <mi>i</mi>
                    </msub>
                    <mo>,</mo>
                    <mi>&#x3B8;</mi>
                    <mo stretchy="false">)</mo>
                    <msup>
                        <mo stretchy="false">)</mo>
                        <mrow class="MJX-TeXAtom-ORD">
                            <mn>1</mn>
                            <mo>&#x2212;</mo>
                            <msub>
                                <mi>y</mi>
                                <mi>i</mi>
                            </msub>
                        </mrow>
                    </msup>
                </Math></Center>
                <P>This expression can be maximized through various optimization techniques such as Newton-Raphson algorithm or a gradient descent (which is usually applied to log-likelihood).</P>
            </Section>
            <Section title="4. Making Predictions">
                <P>Now as we have the vector of model parameters θ we can calculate the predicted value of the logit function for any new observation x (we will use hat symbol for predicted values):</P>
                <Center>
                    <Math>
                        <mi>l</mi>
                        <mi>o</mi>
                        <mi>g</mi>
                        <mi>i</mi>
                        <mi>t</mi>
                        <mo stretchy="false">(</mo>
                        <mi>p</mi>
                        <mo stretchy="false">)</mo>
                        <mo>=</mo>
                        <mrow class="MJX-TeXAtom-ORD">
                            <mover>
                                <mi>y</mi>
                                <mo stretchy="false">^</mo>
                            </mover>
                        </mrow>
                        <mo>=</mo>
                        <msup>
                            <mi>&#x3B8;</mi>
                            <mi>T</mi>
                        </msup>
                        <mi>x</mi>
                    </Math>
                </Center>
                <P>Then we plug this value into logistic function in order to determine the probability of the data belonging to Class 1 (True, “Yes”, etc):</P>
                <Center><Math>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mover>
                            <mi>p</mi>
                            <mo stretchy="false">^</mo>
                        </mover>
                    </mrow>
                    <mo>=</mo>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mover>
                            <mrow>
                                <mi>p</mi>
                                <mo stretchy="false">(</mo>
                                <mi>C</mi>
                                <mi>l</mi>
                                <mi>a</mi>
                                <mi>s</mi>
                                <mi>s</mi>
                                <mtext>&#xA0;</mtext>
                                <mn>1</mn>
                                <mo stretchy="false">)</mo>
                            </mrow>
                            <mo stretchy="false">^</mo>
                        </mover>
                    </mrow>
                    <mo>=</mo>
                    <mi>l</mi>
                    <mi>o</mi>
                    <mi>g</mi>
                    <mi>i</mi>
                    <mi>s</mi>
                    <mi>t</mi>
                    <mi>i</mi>
                    <mi>c</mi>
                    <mo stretchy="false">(</mo>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mover>
                            <mi>y</mi>
                            <mo stretchy="false">^</mo>
                        </mover>
                    </mrow>
                    <mo stretchy="false">)</mo>
                    <mo>=</mo>
                    <mfrac>
                        <mn>1</mn>
                        <mrow>
                            <mn>1</mn>
                            <mo>+</mo>
                            <msup>
                                <mi>e</mi>
                                <mrow class="MJX-TeXAtom-ORD">
                                    <mo>&#x2212;</mo>
                                    <mrow class="MJX-TeXAtom-ORD">
                                        <mover>
                                            <mi>y</mi>
                                            <mo stretchy="false">^</mo>
                                        </mover>
                                    </mrow>
                                </mrow>
                            </msup>
                        </mrow>
                    </mfrac>
                </Math></Center>
                <P>The last step is to set up a threshold T (\in) [0;1] that will be used in order to make a prediction:</P>
                <Center><Math>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mi mathvariant="normal">M</mi>
                        <mi mathvariant="normal">o</mi>
                        <mi mathvariant="normal">d</mi>
                        <mi mathvariant="normal">e</mi>
                        <mi mathvariant="normal">l</mi>
                        <mtext> </mtext>
                        <mi mathvariant="normal">O</mi>
                        <mi mathvariant="normal">u</mi>
                        <mi mathvariant="normal">t</mi>
                        <mi mathvariant="normal">p</mi>
                        <mi mathvariant="normal">u</mi>
                        <mi mathvariant="normal">t</mi>
                    </mrow>
                    <mo>=</mo>
                    <mrow>
                        <mo>&#123;</mo>
                        <mtable columnalign="left left" rowspacing=".2em" columnspacing="1em" displaystyle="false">
                            <mtr>
                                <mtd>
                                    <mrow class="MJX-TeXAtom-ORD">
                                        <mi mathvariant="normal">C</mi>
                                        <mi mathvariant="normal">l</mi>
                                        <mi mathvariant="normal">a</mi>
                                        <mi mathvariant="normal">s</mi>
                                        <mi mathvariant="normal">s</mi>
                                        <mtext>&nbsp;</mtext>
                                        <mn>1</mn>
                                        <mtext>&nbsp;</mtext>
                                        <mtext>&nbsp;</mtext>
                                        <mi mathvariant="normal">i</mi>
                                        <mi mathvariant="normal">f</mi>
                                    </mrow>
                                </mtd>
                                <mtd>
                                    <mrow class="MJX-TeXAtom-ORD">
                                        <mover>
                                            <mi>p</mi>
                                            <mo stretchy="false">^</mo>
                                        </mover>
                                    </mrow>
                                    <mo>≥</mo>
                                    <mi>T</mi>
                                </mtd>
                            </mtr>
                            <mtr>
                                <mtd>
                                    <mrow class="MJX-TeXAtom-ORD">
                                        <mi mathvariant="normal">C</mi>
                                        <mi mathvariant="normal">l</mi>
                                        <mi mathvariant="normal">a</mi>
                                        <mi mathvariant="normal">s</mi>
                                        <mi mathvariant="normal">s</mi>
                                        <mtext>&nbsp;</mtext>
                                        <mn>2</mn>
                                        <mtext>&nbsp;</mtext>
                                        <mtext>&nbsp;</mtext>
                                        <mi mathvariant="normal">i</mi>
                                        <mi mathvariant="normal">f</mi>
                                    </mrow>
                                </mtd>
                                <mtd>
                                    <mrow class="MJX-TeXAtom-ORD">
                                        <mover>
                                            <mi>p</mi>
                                            <mo stretchy="false">^</mo>
                                        </mover>
                                    </mrow>
                                    <mo>&lt;</mo>
                                    <mi>T</mi>
                                </mtd>
                            </mtr>
                        </mtable>
                        <mo fence="true" stretchy="true" symmetric="true"></mo>
                    </mrow>
                </Math></Center>
                <P>By default the threshold is set up to 0.5, but you can adjust it based on your needs (usually based on the True Positive Rate and False Positive Rate trade-off).</P>
                <Center><img src="/academy/log_4.webp" alt="" /></Center>
            </Section>
            <Section title="5. Regularization">
                <P>Regularization means making the model less complex which can allow it to generalize better (i.e. avoid overfitting) and perform better on a new data.</P>
                <P>As was mentioned above, the coefficients of logistic regression are usually fitted by maximizing the log-likelihood. As many optimization techniques are aimed at finding the minimum of a function we can redefine our goal as minimizing the negative log-likelihood:</P>
                <Center><Math>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mover>
                            <mi>&#x3B8;</mi>
                            <mo stretchy="false">^</mo>
                        </mover>
                    </mrow>
                    <mo>=</mo>
                    <munder>
                        <mo form="prefix">min</mo>
                        <mrow class="MJX-TeXAtom-ORD">
                            <mi>&#x3B8;</mi>
                        </mrow>
                    </munder>
                    <mo stretchy="false">[</mo>
                    <mo>&#x2212;</mo>
                    <mi>l</mi>
                    <mi>o</mi>
                    <mi>g</mi>
                    <mo stretchy="false">(</mo>
                    <mi>L</mi>
                    <mo stretchy="false">(</mo>
                    <mi>&#x3B8;</mi>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <mi>x</mi>
                    <mo stretchy="false">)</mo>
                    <mo stretchy="false">)</mo>
                    <mo stretchy="false">]</mo>
                </Math></Center>
                <P>We can penalize the model of having coefficients that are far from zero by adding a regularization term R ( θ ) multiplied by parameter λ which is called regularization strength:</P>
                <Center><Math>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mover>
                            <mi>&#x3B8;</mi>
                            <mo stretchy="false">^</mo>
                        </mover>
                    </mrow>
                    <mo>=</mo>
                    <munder>
                        <mo form="prefix">min</mo>
                        <mrow class="MJX-TeXAtom-ORD">
                            <mi>&#x3B8;</mi>
                        </mrow>
                    </munder>
                    <mo stretchy="false">[</mo>
                    <mo>&#x2212;</mo>
                    <mi>l</mi>
                    <mi>o</mi>
                    <mi>g</mi>
                    <mo stretchy="false">(</mo>
                    <mi>L</mi>
                    <mo stretchy="false">(</mo>
                    <mi>&#x3B8;</mi>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <mi>x</mi>
                    <mo stretchy="false">)</mo>
                    <mo stretchy="false">)</mo>
                    <mo>+</mo>
                    <mi>&#x3BB;</mi>
                    <mi>R</mi>
                    <mo stretchy="false">(</mo>
                    <mi>&#x3B8;</mi>
                    <mo stretchy="false">)</mo>
                    <mo stretchy="false">]</mo>
                </Math></Center>
                <P>The two most popular regularizations are L1 and L2:</P>
                <Center><Math>
                    <mi>L</mi>
                    <mn>1</mn>
                    <mo>:</mo>
                    <mi>R</mi>
                    <mo stretchy="false">(</mo>
                    <mi>&#x3B8;</mi>
                    <mo stretchy="false">)</mo>
                    <mo>=</mo>
                    <munderover>
                        <mo>&#x2211;</mo>
                        <mrow class="MJX-TeXAtom-ORD">
                            <mi>i</mi>
                            <mo>=</mo>
                            <mn>0</mn>
                        </mrow>
                        <mrow class="MJX-TeXAtom-ORD">
                            <mi>K</mi>
                        </mrow>
                    </munderover>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <msub>
                        <mi>&#x3B8;</mi>
                        <mi>i</mi>
                    </msub>
                    <mrow class="MJX-TeXAtom-ORD">
                        <mo stretchy="false">|</mo>
                    </mrow>
                    <mi>L</mi>
                    <mn>2</mn>
                    <mo>:</mo>
                    <mi>R</mi>
                    <mo stretchy="false">(</mo>
                    <mi>&#x3B8;</mi>
                    <mo stretchy="false">)</mo>
                    <mo>=</mo>
                    <mfrac>
                        <mn>1</mn>
                        <mn>2</mn>
                    </mfrac>
                    <munderover>
                        <mo>&#x2211;</mo>
                        <mrow class="MJX-TeXAtom-ORD">
                            <mi>i</mi>
                            <mo>=</mo>
                            <mn>0</mn>
                        </mrow>
                        <mrow class="MJX-TeXAtom-ORD">
                            <mi>K</mi>
                        </mrow>
                    </munderover>
                    <msubsup>
                        <mi>&#x3B8;</mi>
                        <mi>i</mi>
                        <mn>2</mn>
                    </msubsup>
                </Math></Center>
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