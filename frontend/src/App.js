import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {PhoneCatalog} from "./Components/PhoneCatalog";
import {PhoneInfo} from "./Components/PhoneInfo"
import {PhoneCreationForm} from "./Components/PhoneCreationForm";
import {PhoneEditionInfo} from "./Components/PhoneEditionInfo";


function App() {
  return (
    <div className="App">
        <section className="start">
            <BrowserRouter>
                <Switch>
                    <Route exact path = {"/phones/newPhone"}>
                        <PhoneCreationForm/>
                    </Route>
                    <Route exact path = {"/phones"}>
                       <PhoneCatalog/>
                    </Route>
                    <Route exact path = "/">
                        <Redirect to = "/phones"/>
                    </Route>
                    <Route exact path = {"/:phoneId"}>
                        <PhoneInfo />
                    </Route>
                    <Route exact path = {"/phones/:phoneId/edit"}>
                        <PhoneEditionInfo/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </section>
    </div>
  );
}

export default App;
