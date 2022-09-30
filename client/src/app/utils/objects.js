const columns = {
  date: {
    path: 'date',
    name: 'Дата',
  },
  name: {
    path: 'name',
    name: 'Название',
    sort: true,
  },
  quantity: {
    path: 'quantity',
    name: 'Количество',
    sort: true,
  },
  distance: {
    path: 'distance',
    name: 'Расстояние',
    sort: true,
  },
};

const conditions = {
  include: {
    path: 'include',
    name: 'Содержит',
  },
  equal: {
    path: 'equal',
    name: 'Равно',
  },
  over: {
    path: 'over',
    name: 'Больше',
  },
  less: {
    path: 'less',
    name: 'Меньше',
  },
};

export default { columns, conditions };
