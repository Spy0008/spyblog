import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitterX, BsLinkedin, BsGithub } from 'react-icons/bs'

export default function FooterCon() {
    return (
        <Footer container className="border border-t-8 border-orange-500">
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                    <div className="mt-5 ">
                        <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
                            <span className="px-2 py-1 bg-gradient-to-r from-pink-500  to-orange-500 rounded-lg text-white ">Spy</span>
                            <span className="text-black">Blog's</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title="About" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                 href=""
                                 target="_blank"
                                 rel="noopener noreferrer"
                                >
                                    My Portfolio
                                </Footer.Link>
                                <Footer.Link
                                 href="/about"
                                 target="_blank"
                                 rel="noopener noreferrer"
                                >
                                    Spy Blog's
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Follow us on" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                 href="https://www.github.com/spy0008"
                                 target="_blank"
                                 rel="noopener noreferrer"
                                >
                                    Github
                                </Footer.Link>
                                <Footer.Link
                                 href="https://www.linkedin.com/in/naman-sompura-395567312"
                                 target="_blank"
                                 rel="noopener noreferrer"
                                >
                                    Linkedin
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Legal stuff" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                 href="#"
                                >
                                    Terms & Conditions
                                </Footer.Link>
                                <Footer.Link
                                 href="#"
                                >
                                    Privacy Policy
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>            
                    </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href="#" by="Spy Blog's" year={new Date().getFullYear()}/>
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href="#" icon={BsFacebook} />
                        <Footer.Icon href="#" icon={BsInstagram} />
                        <Footer.Icon href="#" icon={BsTwitterX} />
                        <Footer.Icon href="https://www.linkedin.com/in/naman-sompura-395567312" icon={BsLinkedin} />
                        <Footer.Icon href="https://www.github.com/spy0008" icon={BsGithub} />
                    </div>
                </div>
            </div>
        </Footer>
    )
}