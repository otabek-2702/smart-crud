import { AbilityBuilder, createMongoAbility } from '@casl/ability';

const defineAbilitiesFor = (role?: string) => {
  const { can, rules } = new AbilityBuilder(createMongoAbility);
  const detectedRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');

  if (detectedRole === 'admin') {
    can('read', 'Products');
    can('read', 'Categories');
    can('read', 'Sellers');
    can('read', 'Admins');
    can('read', 'Admins');
    can('edit', 'Product');
    can('create', 'Category');
    can('read', 'Category');
    can('edit', 'Category');
    can('delete', 'Category');
    can('create', 'Seller');
    can('read', 'Seller');
    can('edit', 'Seller');
    can('delete', 'Seller');
    can('read', 'Admin');
    can('update', 'Admin');
    // can('delete', 'Admin');
  } else if (detectedRole === 'seller') {
    can('read', 'Products');
    can('read', 'Categories');
    can('create', 'Product');
    can('read', 'Product');
    can('delete', 'Product');
  }

  return createMongoAbility(rules);
};

const ability = defineAbilitiesFor();

export {defineAbilitiesFor}

export default ability;