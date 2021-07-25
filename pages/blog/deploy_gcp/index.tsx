import Link from "next/link"
import styles from "./index.module.sass"
import Sidebar from "@modules/text/Sidebar/Sidebar"
import Section from "@modules/text/Section/Section"
import Title from "@modules/text/Title/Title"
import Container from "@modules/Container/Container"
import P from "@modules/text/P/P"
import A from "@modules/text/A/A"
import Blue from "@modules/text/Blue"
import Center from "@modules/text/Center/Center"
import Code from "@modules/text/Code/Code"
import Author from "@modules/text/Author/Author"
import ArrowTop from "@modules/text/ArrowTop/ArrowTop"

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
            },
            {
              text: "Running Jupyter Notebooks on Google Cloud",
              link: "/blog/deploy_gcp",
              active: true,
            },
          ]}
        />
        <Title type="h6">Running Jupyter Notebooks on Google Cloud</Title>
        <Section title="Part 1: Setting up the Google Project and Compute Engine Instance">
          <P><b>Step 1:</b> Create a free account in Google Cloud with 300$ credit. For this step, you will have to put your payment information and verify your account. It’s the most simple step. If you fail this step, close your laptop and think where you are going in life.</P>
          <P><b>Step 2:</b> Create a new project. You can either use an existing Google Cloud project or create a new one over <A to="https://console.cloud.google.com/projectcreate">here</A>.</P>
        </Section>
        <Section>
          <Center><img src="/academy/1.gif" alt="" /></Center>
          <P><b>Step 3:</b> Create a VM instance. Once you created and/or selected a project</P>
          <P>Click on the three lines on the upper left corner, then go to <A to="https://console.cloud.google.com/compute/instances">Compute Engine &gt; VM instances</A> to create a new GCE instance here.</P>
          <Center><img src="/academy/1.jpg" alt="" /></Center>
          <P>I selected <b>europe-west2</b> as the region but any region/zone will do for this tutorial. Compute Engine also allows you to change and customize the number of CPU cores, memory, GPUs, and boot disk.</P>
          <Center><img src="/academy/2.jpg" alt="" /></Center>
          <P>To follow along the tutorial, select the <b>g1-small</b> (or a larger) instance, change the boot disk to <b>Ubuntu 18.04 LTS</b> and set the Firewall settings to <b>allow HTTP traffic</b>. Pricing might differ across regions but this particular configuration got me a monthly estimate cost of $17.04.</P>
          <P>Now click on ‘Create’ and your instance is ready! <Blue>It might take a few minutes to boot up the VM instance once you click create</Blue></P>
          <P><b>Step 4:</b> Make external IP address as static. By default, the external IP address is dynamic and we need to make it static to make our life easier. Click on the three horizontal lines on top left and then under networking, click on VPC network and then External IP addresses.</P>
          <Center><img src="/academy/3.jpg" alt="" /></Center>
          <P>Change the type from Ephemeral to Static.</P>
          <Center><img src="/academy/4.jpg" alt="" /></Center>
          <P><b>Step 5:</b> Create a Firewall rule. We enabled HTTP traffic for our GCE instance but there is one more thing we need to do. Our Flask app will be running on port 5000 and Google Cloud, by default, doesn’t listen to port 5000. The default network in the project comes with default firewall rules “default-allow-http” and “default-allow-https” to allow traffic on port 80 and 443.</P>
          <P>We need to head over to <A to="https://console.cloud.google.com/networking/firewalls/">VPC network &gt; Firewall</A> rules and create a new firewall rule to accept incoming connections and requests on the port our app will be running on.</P>
          <Center><img src="/academy/5.jpg" alt="" /></Center>
          <P>Click <b>Create a firewall</b> rule and configure the settings as shown below. Make sure to add <Blue>http-server</Blue> to target tags, <Blue>0.0.0.0/0</Blue> to source IP ranges and set <Blue>5000</Blue> as the specified port.</P>
          <Center><img src="/academy/6.jpg" alt="" /></Center>
          <P><b>Step 6:</b> Start your VM instance Now start your VM instance. When you see the green tick click on SSH. This will open a command window and now you are inside the VM.</P>
          <P>When you have a green tick on your VM instance, click on the three vertical dots on the right side of your vm and press start to start the VM. <b>IMPORTANT</b> DON’T FORGET TO STOP YOUR GPU INSTANCE AFTER YOU ARE DONE BY CLICKING ON THE THREE DOTS ON THE IMAGE ABOVE AND SELECTING STOP. OTHERWISE GCP WILL KEEP CHARGING YOU ON AN HOURLY BASIS.</P>
        </Section>
        <Section title="Part 2: Install Jupyter notebook and other packages">
          <P>In your SSH terminal, enter:</P>
          <Code text={["wget http://repo.continuum.io/archive/Anaconda3-4.0.0-Linux-x86_64.sh", "bash Anaconda3-4.0.0-Linux-x86_64.sh"]} />
          <P>Answer <Blue>yes</Blue> to the last question about prepending the install location to PATH. To make use of Anaconda right away, source your bashrc:</P>
          <Code text={["source ~/.bashrc"]} />
          <P>Now, install other softwares:</P>
          <Code text={["pip install tensorflow", "pip install keras"]} />
          <P>Set up the VM server. Open up a SSH session to your VM. Check if you have a Jupyter configuration file:</P>
          <Code text={["ls ~/.jupyter/jupyter_notebook_config.py"]} />
          <P>If it doesn’t exist, create one:</P>
          <Code text={["jupyter notebook --generate-config"]} />
          <P>We’re going to add a few lines to your Jupyter configuration file; the file is plain text so, you can do this via your favorite editor (e.g., vim, emacs). Make sure you replace the port number with the one you allowed firewall access to in step 5 of Part 1.</P>
          <Code text={["c = get_config()", "c.NotebookApp.ip = '*'", "c.NotebookApp.open_browser = False", "c.NotebookApp.port ="]} />
          <P>It should look something like this :</P>
          <Center><img src="/academy/7.jpg" alt="" /></Center>
          <P>Launching Jupyter Notebook. To run the jupyter notebook, just type the following command in the ssh window you are in:</P>
          <Code text={["jupyter-notebook --no-browser --port=5000"]} />
          <P>Launching Jupyter Notebook. To run the jupyter notebook, just type the following command in the ssh window you are in:</P>
          <Code text={["http://<External Static IP Address>:<Port Number>"]} />
          <P>where, external ip address is the ip address which we made static and port number is the one which we allowed firewall access to. Congratulations!</P>
          <Center><img src="/academy/8.jpg" alt="" /></Center>
          <P>You successfully installed jupyter notebook on GCP!</P>
        </Section>
        <Section>
          <Author name="Andrew Wolf" about={["Apr 25, 2020"]} img="/academy/avatar_1.png" imgAlt="Andrew Wolf" />
          <ArrowTop />
        </Section>
      </Container>
    </>
  )
}

export default index
