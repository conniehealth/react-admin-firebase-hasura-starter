import React from 'react';
import {
    List,
    Filter,
    Edit,
    SimpleForm,
    Datagrid,
    TextInput,
    TextField,
    DateField,
    // BooleanField,
    Show,
    TabbedShowLayout,
    Tab,
    // ReferenceManyField,
    TopToolbar,
    ListButton
} from 'react-admin';

const UserEmailFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by Email" source="email" alwaysOn />
    </Filter>
);

export const UserList = props => (
    <List filters={<UserEmailFilter />} bulkActionButtons={false} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="first_name" />
            <TextField source="last_name" />
            <TextField source="email" />
            <DateField source="created_at" label="Created At" />
            <DateField source="updated_at" label="Updated At" />
        </Datagrid>
    </List>
);

const UserShowActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data} label="Back" />
    </TopToolbar>
);

const UserTitle = ({ record }) => {
    return <span>User: {record ? `${record.email}` : ''}</span>;
};

export const UserShow = (props) => (
    <Show title={<UserTitle />} actions={<UserShowActions />} {...props}>
        <TabbedShowLayout>
            <Tab label="summary">
                <TextField source="id" />
                <TextField source="first_name" />
                <TextField source="last_name" />
                <TextField source="email" />
                <DateField label="Created At" source="created_at" />
                <DateField label="Updated At" source="updated_at" />
            </Tab>
            {/* <Tab label="todos" path="todos">
                <ReferenceManyField reference="todos" target="user_id" addLabel={false}>
                    <Datagrid rowClick="edit">
                        <TextField source="id" label="Todo Id" />
                        <TextField source="title" />
                        <BooleanField source="is_completed" label="Completed?" />
                        <DateField source="created_at" />
                    </Datagrid>
                </ReferenceManyField>
            </Tab> */}
        </TabbedShowLayout>
    </Show>
);

export const UserEdit = (props) => (
    <Edit title={<UserTitle />} actions={<UserShowActions />} {...props}>
        <SimpleForm>
            <TextInput disabled source="email" label="Email" />
            <TextInput source="first_name" />
            <TextInput source="last_name" />
        </SimpleForm>
    </Edit>
);
