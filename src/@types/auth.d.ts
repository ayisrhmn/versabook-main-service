interface Me {
  id: string;
  email: string;
  fullname: string;
}

interface MeBusiness extends Me {
  business: {
    name: string;
    slug: string;
  };
}
