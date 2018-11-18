import * as React from "react"
import { connect } from "react-redux"
import { Route, RouteProps } from "react-router-dom"
import styled from "styled-components"

interface InnerProps {
  component: React.ComponentType<any>
}

type Props = InnerProps & RouteProps

class MainLayout extends React.Component<Props, {}> {
  render() {
    const { component: Component, ...rest } = this.props

    return (
      <Route
        {...rest}
        render={matchProps => (
          <Root>
            <Component {...matchProps} />
          </Root>
        )}
      />
    )
  }
}

export default connect()(MainLayout)

const Root = styled.div``
