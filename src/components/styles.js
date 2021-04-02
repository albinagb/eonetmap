import { animated } from "react-spring";
import styled from "styled-components";

const Container = styled(animated.div)`
  display: flex;
  align-items: flex-start;
  position: absolute;
  padding: 0;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.05);
  will-change: width, height;
  z-index: 400;
  margin: -10px 0 0 0;
`;

export { Container };
