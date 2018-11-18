import MainLayout from "./pages/MainLayout"
import PageHome from "./pages/PageHome"
import React, { Component, Fragment } from "react"
import { Switch } from "react-router-dom"

class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <MainLayout exact={true} path="/" component={PageHome} />
        </Switch>
      </Fragment>
    )
  }
}

export default App
