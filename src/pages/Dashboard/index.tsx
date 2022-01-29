import { Component } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface DashboardProps {

}

const Dashboard = ({ }: DashboardProps): JSX.Element => {
  function handleAddFood = async food => {
    const { foods } = this.state;
    console.log('foods', foods);

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      this.setState({ foods: [...foods, response.data] });
    } catch (err) {
      console.log(err);
    }
  };

  function handleUpdateFood = async food => {
    const { foods, editingFood } = this.state;
    console.log('foods 2: ', foods);
    console.log('editingFood: ', editingFood);


    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      this.setState({ foods: foodsUpdated });
    } catch (err) {
      console.log(err);
    }
  };

  function handleDeleteFood = async id => {
    const { foods } = this.state;

    console.log('foods 3: ', foods);
    console.log('id: ', id);
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    this.setState({ foods: foodsFiltered });
  };

  function toggleModal = () => {
    const { modalOpen } = this.state;
    console.log('modalOpen: ', modalOpen);

    this.setState({ modalOpen: !modalOpen });
  };

  function toggleEditModal = () => {
    const { editModalOpen } = this.state;
    console.log('editModalOpen: ', editModalOpen);

    this.setState({ editModalOpen: !editModalOpen });
  };

  function handleEditFood = food => {
    console.log('food: ', food);
    this.setState({ editingFood: food, editModalOpen: true });
  };

  const { modalOpen, editModalOpen, editingFood, foods } = this.state;
  console.log('modalOpen: ', modalOpen);
  console.log('editModalOpen: ', editModalOpen);
  console.log('editingFood: ', editingFood);
  console.log('foods: ', foods);

  return (
    <>
      <Header openModal={this.toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={this.toggleModal}
        handleAddFood={this.handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={this.toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={this.handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={this.handleDeleteFood}
              handleEditFood={this.handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

class Dashboard1 extends Component {
  constructor(props) {
    console.log('props', props);
    super(props);
    this.state = {
      foods: [],
      editingFood: {},
      modalOpen: false,
      editModalOpen: false,
    };
  }

  async componentDidMount() {
    const response = await api.get('/foods');

    this.setState({ foods: response.data });
  }

  // handleAddFood = async food => {
  //   const { foods } = this.state;
  //   console.log('foods', foods);

  //   try {
  //     const response = await api.post('/foods', {
  //       ...food,
  //       available: true,
  //     });

  //     this.setState({ foods: [...foods, response.data] });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // handleUpdateFood = async food => {
  //   const { foods, editingFood } = this.state;
  //   console.log('foods 2: ', foods);
  //   console.log('editingFood: ', editingFood);


  //   try {
  //     const foodUpdated = await api.put(
  //       `/foods/${editingFood.id}`,
  //       { ...editingFood, ...food },
  //     );

  //     const foodsUpdated = foods.map(f =>
  //       f.id !== foodUpdated.data.id ? f : foodUpdated.data,
  //     );

  //     this.setState({ foods: foodsUpdated });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // handleDeleteFood = async id => {
  //   const { foods } = this.state;

  //   console.log('foods 3: ', foods);
  //   console.log('id: ', id);
  //   await api.delete(`/foods/${id}`);

  //   const foodsFiltered = foods.filter(food => food.id !== id);

  //   this.setState({ foods: foodsFiltered });
  // };

  // toggleModal = () => {
  //   const { modalOpen } = this.state;
  //   console.log('modalOpen: ', modalOpen);

  //   this.setState({ modalOpen: !modalOpen });
  // };

  // toggleEditModal = () => {
  //   const { editModalOpen } = this.state;
  //   console.log('editModalOpen: ', editModalOpen);

  //   this.setState({ editModalOpen: !editModalOpen });
  // };

  // handleEditFood = food => {
  //   console.log('food: ', food);
  //   this.setState({ editingFood: food, editModalOpen: true });
  // };

  // render() {
  //   const { modalOpen, editModalOpen, editingFood, foods } = this.state;
  //   console.log('modalOpen: ', modalOpen);
  //   console.log('editModalOpen: ', editModalOpen);
  //   console.log('editingFood: ', editingFood);
  //   console.log('foods: ', foods);

  //   return (
  //     <>
  //       <Header openModal={this.toggleModal} />
  //       <ModalAddFood
  //         isOpen={modalOpen}
  //         setIsOpen={this.toggleModal}
  //         handleAddFood={this.handleAddFood}
  //       />
  //       <ModalEditFood
  //         isOpen={editModalOpen}
  //         setIsOpen={this.toggleEditModal}
  //         editingFood={editingFood}
  //         handleUpdateFood={this.handleUpdateFood}
  //       />

  //       <FoodsContainer data-testid="foods-list">
  //         {foods &&
  //           foods.map(food => (
  //             <Food
  //               key={food.id}
  //               food={food}
  //               handleDelete={this.handleDeleteFood}
  //               handleEditFood={this.handleEditFood}
  //             />
  //           ))}
  //       </FoodsContainer>
  //     </>
  //   );
  // }
};

export default Dashboard;
