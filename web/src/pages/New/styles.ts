import styled from 'styled-components';

interface Props {
  preview: any;
}

export const Thumbnail = styled.label`
  margin-bottom: 20px;
  border: ${props => (props.preview ? 0 : '1px dashed #ddd')};
  background: url(${(props: Props) => props.preview && props.preview})
    center/cover no-repeat;
  cursor: pointer;
  height: 160px;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    display: ${props => (props.preview ? 'none' : 'inline-block')};
  }

  input {
    display: none;
  }
`;
