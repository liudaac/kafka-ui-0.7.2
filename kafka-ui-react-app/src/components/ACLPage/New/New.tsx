import React from 'react';
import { KafkaAcl } from 'generated-sources';
import { FormProvider, useForm } from 'react-hook-form';
import { ClusterNameRoute, clusterACLPath } from 'lib/paths';
import AclForm from 'components/ACLPage/shared/Form/AclForm';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeading from 'components/common/PageHeading/PageHeading';
import useAppParams from 'lib/hooks/useAppParams';
import { useCreateAcl } from 'lib/hooks/api/acl';

enum Filters {
  RESOURCETYPE = 'resourceType',
  RESOURCENAME = 'resourceName',
  NAMEPATTERNTYPE = 'namePatternType',
  PRINCIPAL = 'principal',
  HOST = 'host',
  OPERATION = 'operation',
  PERMISSION = 'permission',
}

const New: React.FC = () => {
  const { clusterName } = useAppParams<ClusterNameRoute>();
  const methods = useForm<KafkaAcl>({
    mode: 'onChange',
  });

  const createAcl = useCreateAcl(clusterName);

  const navigate = useNavigate();

  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const resourceType = params.get(Filters.RESOURCETYPE) || 'Topic';
  const resourceName = params.get(Filters.RESOURCENAME) || '';
  const namePatternType = params.get(Filters.NAMEPATTERNTYPE) || 'LITERAL';
  const principal = params.get(Filters.PRINCIPAL) || '';
  const host = params.get(Filters.HOST) || '*';
  const operation = params.get(Filters.OPERATION) || 'Read';
  const permission = params.get(Filters.PERMISSION) || 'Allow';

  const onSubmit = async (data: KafkaAcl) => {
    try {
      await createAcl.createResource(data);
      navigate(`../acl`);
    } catch (e) {
      // do nothing
    }
  };

  return (
    <>
      <PageHeading
        text={search ? 'Copy' : 'Create'}
        backText="Access Control List"
        backTo={clusterACLPath(clusterName)}
      />
      <FormProvider {...methods}>
        <AclForm
          resourceType={resourceType}
          resourceName={resourceName}
          namePatternType={namePatternType}
          principal={principal}
          host={host}
          operation={operation}
          permission={permission}
          isSubmitting={createAcl.isLoading}
          onSubmit={methods.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </>
  );
};

export default New;
