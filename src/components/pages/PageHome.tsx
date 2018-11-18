import * as React from "react"
import { connect } from "react-redux"
import styled from "styled-components"

class PageHome extends React.Component {
  render() {
    return <Root>home</Root>
  }
}

export default connect()(PageHome)

const Root = styled.div``
