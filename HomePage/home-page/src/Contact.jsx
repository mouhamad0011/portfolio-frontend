import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import linkedin from "./linkedin-svgrepo-com.svg";
import github from "./github-142-svgrepo-com_1.svg";
import gmail from "./mail-open-alt-1-svgrepo-com_1.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';

import './App2.css';
const Contact = () => {
    const form = useRef();
  
    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_n29540m', 'template_ht1z0cl', form.current, 'Lvk1L6c9LoarSAiee')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

  return (<div className="contactmain" id="contact">
  <h3
    className="title"
    style={{ fontSize: 35, color: "aliceblue" }}
  >
    Got a Project in <span style={{ color: "#68E0CF", textAlign:"center" }}>mind?</span>
  </h3>
  <div className="c">
    <div className="contactmain1">
    <form ref={form} onSubmit={sendEmail} className="contactmain1">
      <input
        type="text"
        className="line-input"
        placeholder="Your Name"
        span=""      name="from_name" 

        style={{ color: "#AAA9A8", fontSize: 24 }}
      />
      <br/>
      <input
        type="text"
        className="line-input"
        placeholder="Your Email"
        span="" name="user_email" 
        style={{ color: "#AAA9A8", fontSize: 24 }}
      />
      <br/>
      <input
        type="text"
        className="line-input"
        placeholder="Your Message"
        span="" name="message"
        style={{ color: "#AAA9A8", fontSize: 24 }}
      />
    <br/>
      <input type="submit" value="Send message" className="downloadcv1" style={{ color: "aliceblue" }}/>
      </form>
    </div>
    <div className="contact2">
      <div className="bgcontact2">
        <h2 style={{ color: "aliceblue", fontSize: 34, textAlign: "center" }}>
          Jihan Shamas
        </h2>
        <h4 style={{ color: "#68E0CF", fontSize: 22, textAlign: "center" }}>
          +(961) 3 473 351
          <br />
          Full-Stack Web Developer
          <br />
          Beirut,Lebanon
        </h4>
        <div className="link1">
        <img src={gmail} className="logo" />
<a href="mailto:jihan.shamas@gmail.com" style={{ textDecoration: 'none', color:"white", fontSize:"54", ahover:"aqua" }}>
  jihan.shamas@gmail.com
</a>

        </div>
        <div className="link1">
          <img src={linkedin} className="logo1" />
          <a href="https://www.linkedin.com/in/jihanshamas/" className="n">
            Linkedin{" "}
          </a>
        </div>
        <div className="link1">
        <FontAwesomeIcon icon={faSquareGithub} size="2xl" style={{color:"#68E0CF"}} className='logo'/>
          <a href="https://github.com/JihanSh" className="n">
            github{" "}
          </a>
        </div>
      </div>
    </div>
  </div>

</div>

    
  );
};

export default Contact;




























