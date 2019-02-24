import React, { Component } from 'react';
import Script from './Script'
import URL, { URL2 } from './URL';
class App extends Component {



  componentWillMount(){
    sessionStorage.clear();
    let current = this
    fetch(URL+"/api/user/getinfo", {
          credentials: 'include',
          method: 'GET',
          headers : new Headers(),
          }).then((resp) => resp.json())
          .then(function(data) {
            if(!data.error){
              if(data.userroles_id == 3){
                document.location="/first_search";
              }else if(data.userroles_id == 2){
                document.location="/view/rfps";
              }else{
              }
            }else{
              current.setState({user: data})
            }
            })

    fetch(`${URL2}/select/remove/all`, {
          credentials: 'include',
          method: 'GET',
        }).then((resp) => resp.json())
          .then(function(data) {
            if(data.error){

            }else{

            }
          })
  }
  render(){
    return (
      <div>

              <nav className="one-page-header one-page-header-style-2 navbar navbar-default navbar-fixed-top" role="navigation">
                <div className="container">
                  <div className="menu-container page-scroll">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                    </button>
                    <a className="navbar-brand" href="#intro">
                      {/* <span>U</span>nify */}
                    </a>
                  </div>
                  <div className="log-reg-block-simple cd-log_reg">
                    <a className="btn-u" href="/signin">Sign in</a>
                  </div>
                  {/*
                  <div class="top-contact-block">
                      <i class="fa fa-phone fa-1"></i> <a href="tel:0 800 2000 123">0 800 2000 123</a>
                  </div>
      */}
                  {/* Collect the nav links, forms, and other content for toggling */}
                  <div className="collapse navbar-collapse navbar-ex1-collapse">
                    <div className="menu-container">
                      <ul className="nav navbar-nav">
                        <li className="page-scroll home">
                          <a href="index.html#intro">Home</a>
                        </li>
                        <li className="page-scroll">
                          <a href="index.html#about">About Us</a>
                        </li>
                        {/*                        <li class="page-scroll">
                                  <a href="#faq">FAQ</a>
                              </li>
                              <li class="page-scroll">
                                  <a href="#news">News</a>
                              </li>
      */}                        <li className="page-scroll">
                          <a href="index.html#contact">Contact</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /.navbar-collapse */}
                </div>
                {/* /.container */}
              </nav>
              {/*=== End Header ===*/}
              {/* Promo block BEGIN */}
              <section className="promo-section" id="intro">
                {/* Fullscreen Static Image BEGIN */}
                <div className="fullscreen-static-image fullheight">
                  {/* Promo Content BEGIN */}
                  <div className="container valign__middle">
                    <div style={{float: 'center'}} />
                    <div className="row">
                      <div className="col-sm-10 col-sm-offset-2 text-center-xs" style={{textAlign: "center"}}>
                        <img src="/images/design/group.svg" alt="Logo" width={600} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-10 col-sm-offset-1 text-center-xs">
                        <h2><span className="color-green">JustMICE</span>  - The Easiest, Fastest and most Integrated way for Corporates to Book Meetings </h2>
                        <div className="promo-text">
                          You manage flight and accommodation spend - Now its Time to manage MICE spend.<br />
                        </div>
                        <div className="promo-next">
                          <span className="page-scroll"><a className="btn-u btn-brd btn-brd-hover btn-u-light" href="#contact">Learn More</a></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Promo Content END */}
                </div>
                {/* Fullscreen Static Image END */}
              </section>
              {/* Promo block END */}
              {/* Colorful Service Blocks */}
              <section className="container-fluid">
                <div className="row no-gutter equal-height-columns margin-bottom-10">
                  <div className="col-sm-4">
                    <div className="service-block service-block-purple no-margin-bottom content equal-height-column" style={{height: 239}}>
                      <i className="icon-custom icon-md rounded icon-color-light icon-line icon-lock-open" />
                      <h2 className="heading-md font-light">View the whole market</h2>
                      <p className="no-margin-bottom font-light">JustMice does not only provide access to global chain hotels. In addition Regional chains, Independent hotels and meeting venues.</p>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="service-block service-block-red no-margin-bottom content equal-height-column" style={{height: 239}}>
                      <i className="icon-custom icon-md rounded icon-color-light icon-line icon-bar-chart" />
                      <h2 className="heading-md font-light">Loyalty</h2>
                      <p className="no-margin-bottom font-light">JustMICE offers a meaningful loyalty scheme allowing you to benefit from planning and booking your meetings through a central online tool that allows tracking and proper expense management. </p>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="service-block service-block-aqua no-margin-bottom content equal-height-column" style={{height: 239}}>
                      <i className="icon-custom icon-md rounded icon-color-light icon-line icon-magnifier" />
                      <h2 className="heading-md font-light">Integrated</h2>
                      <p className="no-margin-bottom font-light">Proper travel and expense management is not a stand alone process. JustMICE offers integration to leading OBTs and other essential tool to ensure a smooth and integrated traveller experience.</p>
                    </div>
                  </div>
                </div>
              </section>
              {/* End Colorful Service Blocks */}
              {/*  About Section */}
              <section id="about" className="about-section">
                {/* Intro Block */}
                <div className="container padding-top-60">
                  <div className="title-v1">
                    <h1>We are JustMICE</h1>
                    <p>JustMICE is very simply a service that allows you to manage your companies Meetings and Events spend to the same level that is usually expected for flights and accommodation. This starts with a straight forward planning and booking tool, bringing a huge range of options from all around the globe. with over 400,000 participating venues, you will not be disappoint in the range. <br /><br />
                      In addition to the full range of venues and all the information, dimensions, services and images JustMICE work closely with hotel and venue partners to ensure you get the best price possible for your event as well as the right venue and services. The blend of content, and interation with the venue streamlines the process, reduces wasted time and allows for simple expense management.
                    </p></div>
                </div>
                {/* Our Vision And Mission */}
                <div className="bg-color-light">
                  <div className="container content-lg">
                    <div className="title-v1">
                      <h2>Our Vision And Mission</h2>
                      <p>JustMICE is built and evolved by corporate travel technology professionals who know the business inside out. Our mission is bring this understanding to bear in designing and developing tools and services that allow large and small companies to operate a well planned, managed and tracked MICE programme. We do this by providing the best software tools, integrations and services in the market today.</p>
                    </div>
                  </div>
                </div>
                {/* End Our Vision And Mission */}
                {/* Contacts BEGIN */}
                <section id="contact" className="contacts-section2">
                  <div className="container content">
                    <div className="title-v1">
                      <h2>Contact Us</h2>
                      <p>We would love to do business with you. <br />
                        Focused on helping our clients to a complete view of the market and make them <strong>successful</strong>.<br />
                        Contact us at <a href="mailto:info@JustMICE.com">info@JustMICE.com</a>.
                        Or send your query using the form below and we shall get back to you. </p>
                    </div>
                    <div className="row">
                      <div className="col-md-offset-1 col-md-20 col-sm-10">
                        <form action="assets/php/sky-forms-pro/demo-contacts-process.php" method="post" id="sky-form3" className="sky-form contact-style">
                          <fieldset>
                            <div className="row margin-bottom-30">
                              <div className="col-md-6 col-md-offset-0">
                                <div>
                                  <input name="name" id="name" className="form-control" placeholder="Name" type="text" />
                                </div>
                              </div>
                              <div className="col-md-6 col-md-offset-0">
                                <div>
                                  <input name="email" id="email" className="form-control" placeholder="Email *" type="text" />
                                </div>
                              </div>
                            </div>
                            <div className="row margin-bottom-20">
                              <div className="col-md-12 col-md-offset-0">
                                <div>
                                  <textarea rows={6} name="message" id="message" className="form-control" placeholder="Message" defaultValue={""} />
                                </div>
                              </div>
                            </div>
                            <p><button type="submit" className="btn-u">Send Message</button></p>
                          </fieldset>
                          <div className="message">
                            <i className="rounded-x fa fa-check" />
                            <p>Your message was successfully sent!</p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Contacts END */}

                {/* Footer simple END */}

              </section>




            </div>
    );

      }

}

export default App;
