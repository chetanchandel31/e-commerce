import NotFound from "assets/not-found.svg";
import { Button, H5 } from "haki-ui";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Layout from "../core/Layout";
import { StyledNotFoundContainer } from "./styles";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <StyledNotFoundContainer>
        <img alt="404" src={NotFound} />

        <H5 color="disabled">
          We couldn&apos;t find this page but you&apos;ll be able to find lots
          of products on homepage
        </H5>

        <Button
          endIcon={<FaArrowRight />}
          onClick={() => navigate("/")}
          size="lg"
        >
          Visit Homepage
        </Button>
      </StyledNotFoundContainer>
    </Layout>
  );
};

export default NotFoundPage;
