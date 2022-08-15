import { Nav } from "components/Nav";

import { LayoutProps } from "./Layout.d";
import {
  StyledMainContainer,
  StyledTitle,
  StyledLayout,
} from "./Layout.styles";

function Layout({ children, pageTitle }: LayoutProps) {
  return (
    <StyledLayout>
      <Nav />
      <StyledMainContainer>
        <StyledTitle>{pageTitle}</StyledTitle>
        {children}
      </StyledMainContainer>
    </StyledLayout>
  );
}

export { Layout };
