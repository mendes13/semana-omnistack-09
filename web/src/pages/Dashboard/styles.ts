import styled from 'styled-components';

interface Props {
  bg: string;
}

export const SpotList = styled.ul`
  width: 100%;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 30px;

  li {
    display: flex;
    flex-direction: column;

    strong {
      margin-top: 10px;
      font-size: 24px;
      color: #444;
    }

    span {
      font-size: 15px;
      color: #999;
    }
  }
`;

export const Header = styled.header`
  width: 100%;
  height: 120px;
  border-radius: 4px;
  background: url(${(props: Props) => props.bg && props.bg}) center/cover
    no-repeat;
`;
