import MainLayoutContainer from "./containers/MainLayoutContainer"
import PageHomeContainer from "./containers/PageHomeContainer"
import React, { Component } from "react"
import { Switch } from "react-router-dom"

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <MainLayoutContainer
            exact={true}
            path="/"
            component={PageHomeContainer}
          />
        </Switch>
      </React.Fragment>
    )
  }
}

export default App
