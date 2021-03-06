import React from 'react'
import axios from 'axios'


import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const style = {
    drawer: {
        overlay: {
            backgroundColor: "rgba(255,0,0,0)"
        }
    },
    bar: {
        textAlign: "center",
    }
}

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
        this.state = {
            drawer: {
                open: false
            },
            container: {
                marginLeft: 0
            },
            data: {
                databaseName: ""
            }
        }
    }
    componentWillMount(){
        axios.get("/api/database/name/")
            .then(response => {
                this.setState( {data: {databaseName: response.data.database} } );
            })
    }

    handleDrawerToggle(){
        this.setState({
            drawer: {
                open: !this.state.drawer.open
            }
        })
    }

    render() {
        const contentStyle = {
            transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)'
        }

        if (this.state.drawer.open)
          contentStyle.marginLeft = 290;

        return(
         <div>
            <AppBar
             style= { style.bar }
             title="Database Management System"
             onLeftIconButtonTouchTap={ this.handleDrawerToggle } />

            <Drawer
             open={ this.state.drawer.open }
             docked={ false }
             onRequestChange={(open) => this.setState({drawer:{open}}) }
             zDepth={ 1 }
             overlayStyle ={ style.drawer.overlay }>

                <AppBar
                 title={ this.state.data.databaseName }
                 showMenuIconButton={ false } />

                <MenuItem>Users</MenuItem>
                <MenuItem>Articles</MenuItem>
                <MenuItem>Filmse</MenuItem>
            </Drawer>

            <div style={ contentStyle }>
                <h2>{ this.state.data.databaseName }</h2>
                <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableRowColumn>1</TableRowColumn>
                        <TableRowColumn>John Smith</TableRowColumn>
                        <TableRowColumn>Employed</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>2</TableRowColumn>
                        <TableRowColumn>Randal White</TableRowColumn>
                        <TableRowColumn>Unemployed</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>3</TableRowColumn>
                        <TableRowColumn>Stephanie Sanders</TableRowColumn>
                        <TableRowColumn>Employed</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>4</TableRowColumn>
                        <TableRowColumn>Steve Brown</TableRowColumn>
                        <TableRowColumn>Employed</TableRowColumn>
                      </TableRow>
                    </TableBody>
              </Table>
            </div>

        </div>
         )
    }
}
