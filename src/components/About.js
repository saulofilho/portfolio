import React from 'react'
// import { Link } from "gatsby"
import './About.scss'

const About = () => {
  return (
    <div className="about">
      {/* <p>
        Olá.
        <br />
        <br />
        My name is <a href="https://github.com/saulofilho" className="blue my-name">
          <b>Saulo Filho</b></a>.
        I'm a <a href="https://github.com/saulofilho" className="green">
          <Link to='/dev'>Full Stack Javascript, Ruby, Python, Processing and IoT developer.</Link>
        </a>.
        <br />
        <br />
        A long time ago, I used to be (10+ years) a <Link to='/ad'>creative</Link> marketing professional, writing to advertising, content,
        cinema, music and entertainment scripts.
        <br />
        <br />
        Let’s get in touch for any projects inquiries or even to coding something odd.
        So, don't be shy like me, and feel free to say hello[at]saulofilho.com
      </p>
      <p className="warn-about">
        This World Wide Web generates random backgroundColor & color.
        <br />
        In case of indistinguishable layout: F5.
      </p> */}
      <pre className="ascii-art">
        # hello[at]saulofilho.com    ,.--------._                                            # <br />
        #                           /            ''.                                         # <br />
        #                         ,'                \     |"\                /\          /\  # <br />
        #                /"|     /                   \    |__"              ( \\        // ) # <br />
        #               "_"|    /           z#####z   \  //                  \ \\      // /  # <br />
        #                 \\  #####        ##------".  \//                    \_\\||||//_/   # <br />
        #                  \\/-----\     /          ".  \                      \/ _  _ \     # <br />
        #                   \|      \   |   ,,--..       \                    \/|(O)(O)|     # <br />
        #                   | ,.--._ \  (  | ##   \)      \                  \/ |      |     # <br />
        #                   |(  ##  )/   \ `-....-//       |///////////////_\/  \      /     # <br />
        #                     '--'."      \                \              //     |____|      # <br />
        #                  /'    /         ) --.            \            ||     /      \     # <br />
        #               ,..|     \.________/    `-..         \   \       \|     \ 0  0 /     # <br />
        #            _,##/ |   ,/   /   \           \         \   \       U    / \_//_/      # <br />
        #          :###.-  |  ,/   /     \        /' ""\      .\        (     /              # <br />
        #         /####|   |   (.___________,---',/    |       |\=._____|  |_/               # <br />
        #        /#####|   |     \__|__|__|__|_,/             |####\    |  ||                # <br />
        #       /######\   \      \__________/                /#####|   \  ||                # <br />
        #      /|#######`. `\                                /#######\   | ||                # <br />
        #     /++\#########\  \                      _,'    _/#########\ | ||                # <br />
        #    /++++|#########|  \      .---..       ,/      ,'##########.\|_||                # <br />
        #   //++++|#########\.  \.              ,-/      ,'########,+++++\\_\\               # <br />
        #  /++++++|##########\.   '._        _,/       ,'######,''++++++++\                  # <br />
        # |+++++++|###########|       -----."        _'#######' +++++++++++\                 # <br />
        # |+++++++|############\.     \\     //      /#######/++++++++++++++\                # <br />
      </pre>
      <p className="no-home">NO PLACE FOR RACISM, HOMOPHOBIA, FASCISM, SEXISM, HATE.</p>
    </div>
  );
}

export default About
