import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import ActionMessage from '@/Components/ActionMessage';
import ActionSection from '@/Components/ActionSection';
import ConfirmationModal from '@/Components/ConfirmationModal';
import DialogModal from '@/Components/DialogModal';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import SectionBorder from '@/Components/SectionBorder';
import { ApiToken } from '@/types';
import useTypedPage from '@/Hooks/useTypedPage';
import { Button } from '@/shadcn/ui/button';
import { Label } from '@/shadcn/ui/label';
import { Input } from '@/shadcn/ui/input';
import { Checkbox } from '@/shadcn/ui/checkbox';

interface Props {
  tokens: ApiToken[];
  availablePermissions: string[];
  defaultPermissions: string[];
}

export default function APITokenManager({
                                          tokens,
                                          availablePermissions,
                                          defaultPermissions,
                                        }: Props) {
  const route = useRoute();
  const createApiTokenForm = useForm({
    name: '',
    permissions: defaultPermissions,
  });
  const updateApiTokenForm = useForm({
    permissions: [] as string[],
  });
  const deleteApiTokenForm = useForm({});
  const [displayingToken, setDisplayingToken] = useState(false);
  const [managingPermissionsFor, setManagingPermissionsFor] =
    useState<ApiToken | null>(null);
  const [apiTokenBeingDeleted, setApiTokenBeingDeleted] =
    useState<ApiToken | null>(null);
  const page = useTypedPage();

  function createApiToken() {
    createApiTokenForm.post(route('api-tokens.store'), {
      preserveScroll: true,
      onSuccess: () => {
        setDisplayingToken(true);
        createApiTokenForm.reset();
      },
    });
  }

  function manageApiTokenPermissions(token: ApiToken) {
    updateApiTokenForm.setData('permissions', token.abilities);
    setManagingPermissionsFor(token);
  }

  function updateApiToken() {
    if (!managingPermissionsFor) {
      return;
    }
    updateApiTokenForm.put(
      route('api-tokens.update', [managingPermissionsFor]),
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => setManagingPermissionsFor(null),
      },
    );
  }

  function confirmApiTokenDeletion(token: ApiToken) {
    setApiTokenBeingDeleted(token);
  }

  function deleteApiToken() {
    if (!apiTokenBeingDeleted) {
      return;
    }
    deleteApiTokenForm.delete(
      route('api-tokens.destroy', [apiTokenBeingDeleted]),
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => setApiTokenBeingDeleted(null),
      },
    );
  }

  return (
    <div>
      {/* <!-- Generate API Token --> */}
      <FormSection
        onSubmit={createApiToken}
        title={'Create API Token'}
        description={
          'API tokens allow third-party services to authenticate with our application on your behalf.'
        }
        renderActions={() => (
          <>
            <ActionMessage
              on={createApiTokenForm.recentlySuccessful}
              className="mr-3"
            >
              Created.
            </ActionMessage>

            <Button
              className={classNames({
                'opacity-25': createApiTokenForm.processing,
              })}
              disabled={createApiTokenForm.processing}
            >
              Create
            </Button>
          </>
        )}
      >
        {/* <!-- Token Name --> */}
        <div className="col-span-6 sm:col-span-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            className="mt-1 block w-full"
            value={createApiTokenForm.data.name}
            onChange={e =>
              createApiTokenForm.setData('name', e.currentTarget.value)
            }
            autoFocus
          />
          <InputError
            message={createApiTokenForm.errors.name}
            className="mt-2"
          />
        </div>

        {/* <!-- Token Permissions --> */}
        {availablePermissions.length > 0 && (
          <div className="col-span-6">
            <Label htmlFor="permissions">Permissions</Label>

            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {availablePermissions.map(permission => (
                <div key={permission}>
                  <label className="flex items-center">
                    <Checkbox
                      value={permission}
                      checked={createApiTokenForm.data.permissions.includes(
                        permission,
                      )}
                      onCheckedChange={() => {
                        if (createApiTokenForm.data.permissions.includes(permission)) {
                          createApiTokenForm.setData(
                            'permissions',
                            createApiTokenForm.data.permissions.filter(
                              p => p !== permission,
                            ),
                          );
                        } else {
                          createApiTokenForm.setData('permissions', [
                            permission,
                            ...createApiTokenForm.data.permissions,
                          ]);
                        }
                      }}
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {permission}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </FormSection>

      {tokens.length > 0 ? (
        <div>
          <SectionBorder />

          {/* <!-- Manage API Tokens --> */}
          <div className="mt-10 sm:mt-0">
            <ActionSection
              title={'Manage API Tokens'}
              description={
                'You may delete any of your existing tokens if they are no longer needed.'
              }
            >
              {/* <!-- API Token List --> */}
              <div className="space-y-6">
                {tokens.map(token => (
                  <div
                    className="flex items-center justify-between"
                    key={token.id}
                  >
                    <div className="break-all dark:text-white">
                      {token.name}
                    </div>

                    <div className="flex items-center">
                      {token.last_used_ago && (
                        <div className="text-sm text-gray-400">
                          Last used {token.last_used_ago}
                        </div>
                      )}

                      {availablePermissions.length > 0 ? (
                        <Button
                          className="cursor-pointer ml-6 text-sm"
                          onClick={() => manageApiTokenPermissions(token)}
                        >
                          Permissions
                        </Button>
                      ) : null}

                      <Button
                        className="cursor-pointer ml-6 text-sm text-red-500"
                        onClick={() => confirmApiTokenDeletion(token)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ActionSection>
          </div>
        </div>
      ) : null}

      {/* <!-- Token Value Modal --> */}
      <DialogModal
        isOpen={displayingToken}
        onClose={() => setDisplayingToken(false)}
      >
        <DialogModal.Content title={'API Token'}>
          <div>
            Please copy your new API token. For your security, it won't be shown
            again.
          </div>

          <div className="mt-4 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded font-mono text-sm text-gray-500">
            {page.props?.jetstream?.flash?.token}
          </div>
        </DialogModal.Content>
        <DialogModal.Footer>
          <Button variant="secondary" onClick={() => setDisplayingToken(false)}>
            Close
          </Button>
        </DialogModal.Footer>
      </DialogModal>

      {/* <!-- API Token Permissions Modal --> */}
      <DialogModal
        isOpen={!!managingPermissionsFor}
        onClose={() => setManagingPermissionsFor(null)}
      >
        <DialogModal.Content title={'API Token Permissions'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availablePermissions.map(permission => (
              <div key={permission}>
                <label className="flex items-center">
                  <Checkbox
                    value={permission}
                    checked={updateApiTokenForm.data.permissions.includes(
                      permission,
                    )}
                    onCheckedChange={() => {
                      if (
                        updateApiTokenForm.data.permissions.includes(
                          permission,
                        )
                      ) {
                        updateApiTokenForm.setData(
                          'permissions',
                          updateApiTokenForm.data.permissions.filter(
                            p => p !== permission,
                          ),
                        );
                      } else {
                        updateApiTokenForm.setData('permissions', [
                          permission,
                          ...updateApiTokenForm.data.permissions,
                        ]);
                      }
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {permission}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </DialogModal.Content>
        <DialogModal.Footer>
          <Button variant="secondary" onClick={() => setManagingPermissionsFor(null)}>
            Cancel
          </Button>

          <Button
            onClick={updateApiToken}
            className={classNames('ml-2', {
              'opacity-25': updateApiTokenForm.processing,
            })}
            disabled={updateApiTokenForm.processing}
          >
            Save
          </Button>
        </DialogModal.Footer>
      </DialogModal>

      {/* <!-- Delete Token Confirmation Modal --> */}
      <ConfirmationModal
        isOpen={!!apiTokenBeingDeleted}
        onClose={() => setApiTokenBeingDeleted(null)}
      >
        <ConfirmationModal.Content title={'Delete API Token'}>
          Are you sure you would like to delete this API token?
        </ConfirmationModal.Content>
        <ConfirmationModal.Footer>
          <Button variant="secondary" onClick={() => setApiTokenBeingDeleted(null)}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={deleteApiToken}
            className={classNames('ml-2', {
              'opacity-25': deleteApiTokenForm.processing,
            })}
            disabled={deleteApiTokenForm.processing}
          >
            Delete
          </Button>
        </ConfirmationModal.Footer>
      </ConfirmationModal>
    </div>
  );
}
