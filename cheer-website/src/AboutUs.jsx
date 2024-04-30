import "./AboutUs.css";

function AboutUs() {
    return (
        <div className="about-us-container">
            <img src="https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Company Photo" className="company-photo" />
            <div className="company-info">
                <h2 className="aboutHeader">About Us</h2>
                <p className="aboutParagraph">
                    Welcome to O.L.L.I., a registered not-for-profit organization driven by the dedication of caregivers, united in our mission to enrich the lives of individuals with intellectual disabilities and their families. Our ethos is rooted in creating a community of inclusion and a circle of friendship that not only supports but truly enhances the life experiences of our loved ones.
                </p>
                <h3 className="aboutSubHeader">Our Pillars of Support</h3>
                <p className="aboutParagraph">
                    <strong>CHEER Group:</strong> At the heart of our offerings, CHEER Group represents a coalition of families caring for adults with higher functioning intellectual disabilities. We leverage our collective resources to employ support workers, ensuring a 4:1 participant-to-staff ratio, thereby fostering an environment ripe for the development of life, social, and leisure skills. Our activities are housed within the stunning facilities of Rock Glen Family Resort, offering access to an indoor pool, sauna, fitness center, and more, ensuring our attendees not only develop essential skills but do so in a setting that feels less like a program and more like a community.
                </p>
                <p className="aboutParagraph">
                    <strong>CHEER Connections:</strong> Recognizing the unique challenges faced by caregivers, CHEER Connections serves as a sanctuary for parents and caregivers to come together, share experiences, and extend mutual support. Facilitated monthly meetings provide a platform for knowledge exchange, significantly reducing feelings of isolation among caregivers. This initiative is strengthened by the support from the Ontario Caregivers Association, which aids in providing a serene setting for our gatherings, complete with guest speakers and nourishing lunches.
                </p>
                <p className="aboutParagraph">
                    <strong>CHEER Works:</strong> Employment and skill development take center stage at CHEER Works, where members of the CHEER Group are offered paid employment opportunities tailored to their abilities. This initiative is not just about job creation; it's about crafting a safe, supported environment where our community members can thrive, contribute, and gain a sense of independence.
                </p>
                <p className="aboutParagraph">
                    Our vision extends beyond our programs; it's about weaving a fabric of support that encompasses the whole family, advocating for inclusivity, and celebrating the unique abilities of each individual. We invite you to learn more about our initiatives, participate in our programs, or lend your support in any way you feel called to. Together, we can foster a world where every individual has the opportunity to lead a fulfilling, joyous life, surrounded by a community that truly cares.
                </p>
            </div>
        </div>
    );
}

export default AboutUs;