import React from 'react'
import {Container} from 'react-bootstrap'


const TopicOptions = ({name, imagePath}) => {
    return <Container>
      <img alt={`${name} topping`} src={`https://localhost:3030/${imagePath}`} />
    </Container>
}

export default TopicOptions