var React                   = require('react');
var EntryWrapper            = require('./entry_wrapper.jsx');
var EntryHeaderDetails      = require('./entry_header_details.jsx');
var EntryEditor             = require('./entry_editor.jsx');
var EntryHeaderOptions      = require('./entry_header_options.jsx');
var EntryHeaderEntities     = require('./entry_header_entities.jsx');
var EntryHeaderHistory      = require('./entry_header_history.jsx');
var EntryHeaderPermission   = require('./entry_header_permission.jsx');
var AutoAffix               = require('react-overlays/lib/AutoAffix');
var Crouton                 = require('react-crouton');
//var Notification    = require('react-notification');
var EntryHeader = React.createClass({
        getInitialState: function(){
            return {
                permissionsToolbar:false,
                entitiesToolbar:false,
                historyToolbar:false,
                entryToolbar:false,
                notification:false,
                notificationId:Date.now(),
                notificationMessage:'',
                notificationType:'', 
                notificationOnDismiss:"" 
            }
        },
        viewedbyfunc: function(headerdata) {
            var viewedbyarr = [];
            for (prop in headerdata.view_history) {
                viewedbyarr.push(prop);
            };
            return viewedbyarr;
        },
        entryToggle: function() {
            if (this.state.entryToolbar == false) {
                this.setState({entryToolbar:true})
            } else {
                this.setState({entryToolbar:false})
            }
        },
        historyToggle: function() {
            if (this.state.historyToolbar == false) {
                this.setState({historyToolbar:true});
            } else {
                this.setState({historyToolbar:false});
            }
        },
        notificationToggle: function(message) {
            if (this.state.notification == false) {
                var data = {
                    id: Date.now(),
                    type: 'error',
                    message: 'Hello React-Crouton',
                    autoMiss: true || false,
                    onDismiss: this.setState({notification:false}),
                    buttons: [{
                        name: 'close',
                        listener: function() {

                        }
                    }],
                    hidden: false,
                    timeout: 2000
                }
                this.setState({notificationId:Date.now()});
                this.setState({notificationMessage:message});
                this.setState({notificationType:'info'}); 
                this.setState({notification:true});
                this.setState({notificationOnDismiss:notificationToggle()});
            } else { 
                this.setState({notification:false});
            } 
        },
        permissionsfunc: function(headerdata) {
            var writepermissionsarr = [];
            var readpermissionsarr = []; 
            var readwritepermissionsarr = [];
            for (prop in headerdata.groups) {
                var fullprop = headerdata.groups[prop]
                if (prop == 'read') {
                    headerdata.groups[prop].forEach(function(fullprop) {
                        readpermissionsarr.push(fullprop)
                    });
                } else if (prop == 'modify') {
                    headerdata.groups[prop].forEach(function(fullprop) {
                        writepermissionsarr.push(fullprop)    
                    });
                };
            };
            readwritepermissionsarr.push(readpermissionsarr);
            readwritepermissionsarr.push(writepermissionsarr);
            return readwritepermissionsarr;
        },
        permissionsToggle: function() {
            if (this.state.permissionsToolbar == false) {
                this.setState({permissionsToolbar:true});
            } else {
                this.setState({permissionsToolbar:false});
            } 
        },
        entitiesToggle: function() {
            if (this.state.entitiesToolbar == false) {
                this.setState({entitiesToolbar:true});
            } else {
                this.setState({entitiesToolbar:false});
            }
        },

        render: function() {
            var id = this.props.id;
            var headerdata = this.props.data;
            var viewedby = this.viewedbyfunc(headerdata); 
            var permissions = this.permissionsfunc(headerdata); //pos 0 is read and pos 1 is write
            
            return (
                <div>
                    <AutoAffix>
                    <div id="NewEventInfo" className="entry-header-info-null">
                        <EntryHeaderOptions permissionsToggle={this.permissionsToggle} entryToggle={this.entryToggle} entitiesToggle={this.entitiesToggle} historyToggle={this.historyToggle} />
                        <EntryHeaderDetails id={id} headerdata={headerdata} viewedby={viewedby} />
                        {this.state.historyToolbar ? <EntryHeaderHistory historyToggle={this.historyToggle} /> : null}
                        {this.state.entitiesToolbar ? <EntryHeaderEntities entitiesToggle={this.entitiesToggle} /> : null}
                        {this.state.permissionsToolbar ? <EntryHeaderPermission permissions={permissions} permissionsToggle={this.permissionsToggle} /> : null}
                        {this.state.entryToolbar ? <EntryEditor type='Event' id={id} entryToggle={this.entryToggle} notificationToggle={this.notificationToggle}/> : null}
                        {this.state.notification ? <Crouton id={this.state.notificationId} message={this.state.notificationMessage} type={this.state.notificationType} onDismiss={this.state.notificationOnDismiss} /> : null}
                    <div id="move_entry_toolbar" className="toolbar" style={{display:'none'}}>
                        <img src="/images/close_toolbar.png" className="close_toolbar" onclick="close_toolbar(this)" />
                        <center><b>Select new destination for entry <span id="entryToMove">###</span>:</b>
                            <select style={{width: 400}} onchange="checkValidDestinationEvent()" id="destinationPicker" />
                            <input type="button" className="btn" disabled defaultValue="Move Entry" id="move_entry_button" onclick="moveEntryConfirmed()" />
                        </center>
                    </div>
                    <div id="checklist_toolbar" className="toolbar" style={{display:'none'}}>
                        <img src="/images/close_toolbar.png" className="close_toolbar" onclick="close_toolbar(this)" />
                        <center><b>Select checklist to add:</b>
                            <select id="checklist_toolbar_options" onchange="checklist_selection_changed()" />
                            <input type="button" className="btn" id="add_checklist_button" disabled defaultValue="Add Checklist" onclick="confirm_add_checklist()" />
                        </center>
                    </div>
                </div>
                </AutoAffix>                
        </div>
        );
    } 
});

module.exports = EntryHeader;