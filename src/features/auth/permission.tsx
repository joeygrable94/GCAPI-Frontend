import { Component, JSX, Match, ParentComponent, Switch } from 'solid-js';
import { useUser } from '~/providers/user';
import { Slot, getSlots } from '~/shared/utils';

/* Usage:

<PermissionRequired>
  <SuperAdminRole>
    <h3>Hello Super Admin</h3>
  </SuperAdminRole>
  <AdminRole>
    <h3>Hello Admin</h3>
  </AdminRole>
  <ManagerRole>
    <h3>Hello Manager</h3>
  </ManagerRole>
  <UserRole>
    <h3>Hello User</h3>
  </UserRole>
  <GuestRole>
    <h3>Hello Guest</h3>
  </GuestRole>
</PermissionRequired>
 */

interface PermissionsRequiredProps {
  children: JSX.Element;
}

export const PermissionRequired: Component<PermissionsRequiredProps> = (props) => {
  const [_, user] = useUser();
  const slots = getSlots(props.children);
  return (
    <>
      <Switch>
        <Match when={user.isSuperAdmin()}>{slots.superadmin}</Match>
        <Match when={user.isAdmin()}>{slots.admin}</Match>
        <Match when={user.isManager()}>{slots.manager}</Match>
        <Match when={user.isUser()}>{slots.user}</Match>
        <Match when={user.isGuest()}>{slots.default}</Match>
      </Switch>
    </>
  );
};

export const SuperAdminRole: ParentComponent = (props) => {
  return <Slot name="superadmin">{props.children}</Slot>;
};

export const AdminRole: ParentComponent = (props) => {
  return <Slot name="admin">{props.children}</Slot>;
};

export const ManagerRole: ParentComponent = (props) => {
  return <Slot name="manager">{props.children}</Slot>;
};

export const UserRole: ParentComponent = (props) => {
  return <Slot name="user">{props.children}</Slot>;
};

export const GuestRole: ParentComponent = (props) => {
  return <Slot name="guest">{props.children}</Slot>;
};
