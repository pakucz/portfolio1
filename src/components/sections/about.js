import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import UIUCLogo from '../../images/uiuc-logo.png';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 800px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 90%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);
    transition: transform 0.25s ease;

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      display: block;
      width: 100%;
      height: auto;
      z-index: 1;

      /* 🔑 remove these: */
      mix-blend-mode: normal;
      filter: none;
      transition: none;
    }

    /* 🔑 remove the color overlay completely */
    &::before {
      content: none;
    }

    /* keep the decorative frame effect */
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
      transition: transform 0.25s ease;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <div>
              <p>
                I grew up in the Chicagoland area and moved to UIUC in 2022 to study Computer
                Science, where I’ll be graduating in 2026. I’ve had the chance to work on projects
                ranging from torque vectoring control models for electric vehicles to fintech
                systems at Capital One in downtown Chicago.
              </p>

              <p>
                These experiences have pushed me to think critically about how technology can solve
                complex, real-world problems. Over the course of my college career, I've met a lot
                of awesome people and wanted to share it with you!
              </p>

              <p>
                Outside of school and work, you can usually find me climbing, playing tennis,
                running, or experimenting with new cooking ideas.
              </p>

              <img
                src={UIUCLogo}
                alt="UIUC Logo"
                style={{ height: '250px', marginLeft: '10px', verticalAlign: 'middle' }}
              />
            </div>
          </div>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
