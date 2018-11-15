import * as React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

class PageHomeContainer extends React.Component {
  render() {
    return <Root>home</Root>
  }
}

export default connect()(PageHomeContainer)

const Root = styled.div``
