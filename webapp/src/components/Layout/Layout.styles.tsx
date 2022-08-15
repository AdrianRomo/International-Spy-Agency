import styled from "styled-components";

const StyledLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 1fr auto 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "main"
    "footer";
`;

const StyledMainContainer = styled.main`
  grid-area: main;
  display: grid;
  padding: 3em;
  background: #fdfcfc;
  border-radius: 20px;
  -webkit-box-shadow: 3px 3px 10px #cecece;
  -moz-box-shadow: 3px 3px 10px #cecece;
  box-shadow: 3px 3px 10px #cecece;
  align-self: center;
  justify-self: center;
  min-width: 40%;

  @media (max-width: 480px) {
    width: auto;
    margin: 1rem;
  }

  @media (min-width: 481px) and (max-width: 950px) {
    width: 60%;
  }

  @media (min-width: 2500px) and (max-width: 3500px) {
    width: 30%;
  }

  @media (min-width: 3501px) and (max-width: 6000px) {
    width: 20%;
  }

  small {
    color: #f53a3a;
  }

  label {
    font-weight: bold;
  }
`;

const StyledTitle = styled.p`
  text-align: center;
  color: #007bff;
  font-size: 30px;
  font-weight: bold;
  border-bottom: 2px solid #007bff;
  margin-bottom: 3rem;
  margin-top: 1rem;
`;

export { StyledLayout, StyledMainContainer, StyledTitle };
