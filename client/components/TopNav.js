import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
    AppstoreOutlined,
    CoffeeOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserAddOutlined,
    CarryOutOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
    const [current, setCurrent] = useState("");

    const { state, dispatch } = useContext(Context);
    const { user } = state;

    const router = useRouter();

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    const logout = async () => {
        dispatch({ type: "LOGOUT" });
        window.localStorage.removeItem("user");
        const { data } = await axios.get("/api/logout");
        toast(data.message);
        router.push("/login");
    };

    return (
        <Menu mode="horizontal" selectedKeys={[current]} className="mb-2">
            <Menu.Item
                key="/"
                onClick={(e) => setCurrent(e.key)}
                icon={<AppstoreOutlined />}
            >
                <Link href="/">
                الصفحة الرئيسية
                </Link>
            </Menu.Item>

        {user && user.role && user.role.includes("Instructor") ? (
            <Menu.Item
                key="/instructor/course/create"
                onClick={(e) => setCurrent(e.key)}
                icon={<CarryOutOutlined />}
            >
                <Link href="/instructor/course/create">
                    إنشاء دورة
                </Link>
            </Menu.Item>
        ) : (
            <Menu.Item
                key="/user/become-instructor"
                onClick={(e) => setCurrent(e.key)}
                icon={<TeamOutlined />}
            >
                <Link href="/user/become-instructor">
                    كن معلماً
                </Link>
            </Menu.Item>
        )}

        {user === null && (
            <>
                <Menu.Item
                    key="/login"
                    onClick={(e) => setCurrent(e.key)}
                    icon={<LoginOutlined />}
                >
                    <Link href="/login">
                        تسجيل الدخول
                    </Link>
                </Menu.Item>

                <Menu.Item
                    key="/register"
                    onClick={(e) => setCurrent(e.key)}
                    icon={<UserAddOutlined />}
                >
                    <Link href="/register">
                        انشاء حساب جديد
                    </Link>
                </Menu.Item>
            </>
        )}

        {user !== null && (
            <Menu.SubMenu
                icon={<CoffeeOutlined />}
                title={user && user.name}
                className="float-end"
                style={{float:'right'}}
                key = "SubMenu"
            >
                <Menu.ItemGroup>
                    <Menu.Item key="/user">
                        <Link href="/user">
                            لوحة تحكم المستخدم
                        </Link>
                    </Menu.Item>
                    <Item onClick={logout}>تسجيل خروج</Item>
                </Menu.ItemGroup>
            </Menu.SubMenu>
        )}

        {user && user.role && user.role.includes("Instructor") && (
            <Item
                key="/instructor"
                onClick={(e) => setCurrent(e.key)}
                icon={<TeamOutlined />}
                className="float-end"
                style={{float:'right'}}
            >
                <Link href="/instructor">
                    معلم
                </Link>
            </Item>
        )}
        </Menu>
    );
};

export default TopNav;
