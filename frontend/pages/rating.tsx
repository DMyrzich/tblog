import { Paper, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Typography, } from "@material-ui/core";
import { NextPage } from "next";
import { Api } from "../components/Api";
import { MainLayout } from "../layouts/MainLayout";
import { UsersEntity } from '../../backend/src/users/entities/users.entity';

interface ratingProps {
  users: UsersEntity[];
}

const Rating: NextPage<ratingProps> = ({ users }) => {

  return (
    <MainLayout>
      <Paper className="pl-20 pt-20 pr-20 mb-20" elevation={0}>
        <Typography variant="h5" style={{ fontWeight: "bold", fontSize: 30, marginBottom: 6 }}>
          Рейтинг сообществ и блогов
        </Typography>
        <Typography style={{ fontSize: 15 }}>
          Десять лучших авторов и комментаторов, а также администраторы первых
          десяти сообществ из рейтинга по итогам месяца бесплатно получают
          Plus-аккаунт на месяц.
        </Typography>
        <Tabs className="mt-10" value={0} indicatorColor="primary" textColor="primary">
          <Tab label="Август" />
          <Tab label="За 3 месяца" />
          <Tab label="За все время" />
        </Tabs>
      </Paper>

      <Paper elevation={0}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Имя пользователя</TableCell>
              <TableCell>Рейтинг</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users.map(({ isFollower, fullName, followers }, idx) =>
                <TableRow key={idx}>
                  <TableCell component="th" scope="row">{++idx}</TableCell>
                  <TableCell>{fullName}</TableCell>
                  <TableCell>
                    <span style={{ marginLeft: 20 }}>{followers.length}</span>
                  </TableCell>
                  <TableCell>
                    <span style={{ cursor: 'pointer' }}>{isFollower ? 'Отписаться' : 'Подписаться'}</span>
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </Paper>
    </MainLayout >);
};

export const getServerSideProps = async () => {

  try {

    const users = await Api().user.top();

    return {
      props: { users }
    }

  } catch (err) {
    console.log(err);
  }

  return {
    props: { users: null }
  }
}

export default Rating;