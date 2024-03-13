import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { ClusterName } from 'redux/interfaces';
import { ErrorMessage } from '@hookform/error-message';
import Select, { SelectOption } from 'components/common/Select/Select';
import Input from 'components/common/Input/Input';
import { Button } from 'components/common/Button/Button';
import { InputLabel } from 'components/common/Input/InputLabel.styled';
import { FormError } from 'components/common/Input/Input.styled';
import { StyledForm } from 'components/common/Form/Form.styled';
import { clusterACLPath } from 'lib/paths';
import { useNavigate } from 'react-router-dom';
import useAppParams from 'lib/hooks/useAppParams';

import * as S from './AclForm.styled';

export interface Props {
  resourceType?: string;
  resourceName?: string;
  namePatternType?: string;
  principal?: string;
  host?: string;
  operation?: string;
  permission?: string;
  isEditing?: boolean;
  isSubmitting: boolean;
  onSubmit: (e: React.BaseSyntheticEvent) => Promise<void>;
}

const ResourceTypeOptions: Array<SelectOption> = [
  { value: 'TOPIC', label: 'Topic' },
  { value: 'GROUP', label: 'Group' },
  { value: 'CLUSTER', label: 'Cluster' },
  { value: 'TRANSACTIONAL_ID', label: 'Transactional_id' },
  { value: 'DELEGATION_TOKEN', label: 'Delegation_token' },
  { value: 'USER', label: 'User' },
];

const NamePatternTypeOptions: Array<SelectOption> = [
  { value: 'LITERAL', label: 'Literal' },
  { value: 'MATCH', label: 'Match' },
  { value: 'PREFIXED', label: 'Prefixed' },
];

const OperationOptions: Array<SelectOption> = [
  { value: 'ALL', label: 'All' },
  { value: 'READ', label: 'Read' },
  { value: 'WRITE', label: 'Write' },
  { value: 'CREATE', label: 'Create' },
  { value: 'DELETE', label: 'Delete' },
  { value: 'ALTER', label: 'Alter' },
  { value: 'DESCRIBE', label: 'Describe' },
];

const PermissonOptions: Array<SelectOption> = [
  { value: 'ALLOW', label: 'Allow' },
  { value: 'DENY', label: 'Deny' },
];

const AclForm: React.FC<Props> = ({
  resourceType,
  resourceName,
  namePatternType,
  principal,
  host,
  operation,
  permission,
  isEditing,
  isSubmitting,
  onSubmit,
}) => {
  const {
    control,
    formState: { errors, isDirty, isValid },
    reset,
  } = useFormContext();
  const navigate = useNavigate();
  const { clusterName } = useAppParams<{ clusterName: ClusterName }>();
  
  const getResourceTypeValue =
    ResourceTypeOptions.find((option: SelectOption) => {
      return option.value === resourceType;
    })?.value || ResourceTypeOptions[0].value;
  
  const getNamePatternTypeValue =
    NamePatternTypeOptions.find((option: SelectOption) => 
      return option.value === namePatternType;
    })?.value || NamePatternTypeOptions[0].value;
    
  const getOperationValue =
    OperationOptions.find((option: SelectOption) => 
      return option.value === operation;
    })?.value || OperationOptions[0].value;
    
  const getPermissonValue =
    PermissonOptions.find((option: SelectOption) => 
      return option.value === permission;
    })?.value || PermissonOptions[0].value;

  const onCancel = () => {
    reset();
    navigate(clusterACLPath(clusterName));
  };

  return (
    <StyledForm onSubmit={onSubmit} aria-label="acl form">
      <fieldset disabled={isSubmitting}>
        <fieldset disabled={isEditing}>
          <S.Column>
            <S.NameField>
              <InputLabel htmlFor="aclFormResourceType">Resource Type *</InputLabel>
              <Controller
                defaultValue={ResourceTypeOptions[0].value}
                control={control}
                name="resourceType"
                render={({ field: { name, onChange } }) => (
                  <Select
                    id="aclFormResourceType"
                    aria-labelledby="aclFormResourceTypeLabel"
                    name={name}
                    value={getResourceTypeValue}
                    onChange={onChange}
                    minWidth="250px"
                    options={ResourceTypeOptions}
                  />
                )}
              />
            </S.NameField>
          </S.Column>

          <S.Column>
            <div>
              <InputLabel htmlFor="aclFormResourceName">
                Resource Name *
              </InputLabel>
              <Input
               id="aclFormResourceName"
               autoFocus
               name="resourceName"
               placeholder="Resource Name"
               defaultValue={resourceName}
               autoComplete="off"
              />
              <FormError>
                <ErrorMessage errors={errors} name="resourceName" />
              </FormError>
            </div>

            <div>
              <InputLabel
                id="aclFormNamePatternTypeLabel"
                htmlFor="aclFormNamePatternType"
              >
                NamePatternType *
              </InputLabel>
              <Controller
                defaultValue={NamePatternTypeOptions[0].value}
                control={control}
                name="namePatternType"
                render={({ field: { name, onChange } }) => (
                  <Select
                    id="aclFormNamePatternType"
                    aria-labelledby="aclFormNamePatternTypeLabel"
                    name={name}
                    value={getNamePatternTypeValue}
                    onChange={onChange}
                    minWidth="250px"
                    options={NamePatternTypeOptions}
                  />
                )}
              />
            </div>
          </S.Column>
        </fieldset>

        <S.Column>
          <div>
            <InputLabel htmlFor="aclFormPrincipal">
              Principal *
            </InputLabel>
            <Input
              id="aclFormPrincipal"
              placeholder="Principal"
              name="principal"
              autoFocus
              defaultValue={principal}
              autoComplete="off"
            />
            <FormError>
              <ErrorMessage errors={errors} name="principal" />
            </FormError>
          </div>
          <div>
            <InputLabel htmlFor="aclFormHost">
              Host *
            </InputLabel>
            <Input
              id="aclFormHost"
              placeholder="Host"
              name="host"
              autoFocus
              defaultValue="*"
              autoComplete="off"
            />
            <FormError>
              <ErrorMessage errors={errors} name="host" />
            </FormError>
          </div>
        </S.Column>

        <S.Column>
          <div>
            <InputLabel
              id="aclFormOperationLabel"
              htmlFor="aclFormOperation"
            >
              Operation *
            </InputLabel>
            <Controller
              defaultValue={OperationOptions[0].value}
              control={control}
              name="operation"
              render={({ field: { name, onChange } }) => (
                <Select
                  id="aclFormOperation"
                  aria-labelledby="aclFormOperationLabel"
                  name={name}
                  value={getOperationValue}
                  onChange={onChange}
                  minWidth="250px"
                  options={OperationOptions}
                />
              )}
            />
          </div>

          <div>
            <InputLabel
              id="aclFormPermissionLabel"
              htmlFor="aclFormPermission"
            >
              Permission *
            </InputLabel>
            <Controller
              defaultValue={PermissonOptions[0].value}
              control={control}
              name="permission"
              render={({ field: { name, onChange } }) => (
                <Select
                  id="aclFormPermission"
                  aria-labelledby="aclFormPermissionLabel"
                  name={name}
                  value={getPermissonValue}
                  onChange={onChange}
                  minWidth="250px"
                  options={PermissonOptions}
                />
              )}
            />
          </div>
        </S.Column>
        
        <S.ButtonWrapper>
          <Button
            type="button"
            buttonType="secondary"
            buttonSize="L"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            buttonType="primary"
            buttonSize="L"
            disabled={!isValid || isSubmitting || !isDirty}
          >
            Create ACL
          </Button>
        </S.ButtonWrapper>
      </fieldset>
    </StyledForm>
  );
}

export default AclForm;