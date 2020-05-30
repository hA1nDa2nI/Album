var sqlMap = {
  // 用户表
  user: {
      login: 'SELECT count(*) AS count,password,id FROM record_user WHERE phone = ?;',
      register: 'INSERT INTO record_user(phone, password) VALUES ( ?, ?);',
      profile: 'SELECT username, email, phone, role, userimg FROM record_user WHERE id = ?;',
      update: 'UPDATE record_user SET username = ?, email = ?, userimg = ? WHERE id = ?;',
      repasswd: 'UPDATE record_user SET password = ? WHERE phone = ?;'
  },

  // banner
  index: {
    banner: 'SELECT * FROM record_banner WHERE status = "使用中" ORDER BY id DESC;',
  },

  // 分类表
  category: {
    name: 'SELECT id,name FROM record_category where status = "使用中";'
  },

  // 产品表
  product: {
    index: 'SELECT c.name, a.id, a.title, a.main_image, a.price FROM record_product AS a,record_category AS c WHERE (SELECT count(*) FROM record_product AS b WHERE b.category_id=a.category_id AND b.id>=a.id)<=8 AND a.category_id=c.id AND c.status = "使用中" AND a.status = 1 ORDER BY a.category_id ASC,a.id DESC;',
    commentTop: 'SELECT id, title, main_image, price, commentCount AS numdata FROM record_product WHERE status = 1 ORDER BY commentCount DESC LIMIT 4;',
    updatetime: 'SELECT id, title, main_image, price, date_format(update_time,"%Y-%m-%d") AS numdata FROM record_product WHERE status = 1 ORDER BY update_time DESC LIMIT 4;',
    list: 'SELECT c.name, a.id, a.title, a.main_image, a.price FROM record_product AS a,record_category AS c WHERE c.name = ? AND a.category_id = c.id AND a.status = 1 ORDER BY a.id DESC;',
    detail: 'SELECT c.name, a.* FROM record_product AS a,record_category AS c WHERE a.id = ? AND a.category_id = c.id;',
    like: 'SELECT id, title, main_image, price FROM record_product WHERE id != ? AND category_id = ? AND status = 1 ORDER BY commentCount DESC LIMIT 5;',
    news: 'SELECT id, title, main_image, price FROM record_product WHERE id != ? AND status = 1 ORDER BY update_time DESC LIMIT 5;',
    search: 'SELECT id, title, main_image, price, author FROM record_product WHERE title like ? OR author like ? AND status = 1 ORDER BY id DESC;'
  },

  // 购物车表
  cart: {
    add: 'INSERT INTO record_cart(user_id, product_id, quantity) VALUES (?, ?, ?);',
    show: 'SELECT a.id, a.user_id, a.product_id, a.quantity, a.checked, b.main_image, b.title, b.price, b.author FROM record_cart AS a, record_product AS b WHERE a.user_id = ? AND a.product_id = b.id ORDER BY a.update_time DESC;',
    update: 'UPDATE record_cart SET quantity = ? WHERE id = ?;',
    del: 'DELETE FROM record_cart WHERE id = ?;',
    select: 'SELECT count(*) AS count FROM record_cart WHERE user_id = ? AND product_id = ?;'
  },

  // 收货地址表
  address: {
    add: 'INSERT INTO record_shipping(user_id, receiver_name, receiver_phone, receiver_province, receiver_city, receiver_district, receiver_address) VALUES (?, ?, ?, ?, ?, ?, ?);',
    show: 'SELECT id, receiver_name, receiver_phone, receiver_province, receiver_city, receiver_district, receiver_address, state FROM record_shipping WHERE user_id = ? AND state != 2 ORDER BY update_time DESC;',
    state: 'UPDATE record_shipping SET state = 0 where user_id = ?;',
    default: 'UPDATE record_shipping SET state = 1 where id = ?;',
    del: 'UPDATE record_shipping SET state = 2 WHERE id = ?;'
  },

  // 订单表，订单详情表
  order: {
    add: 'INSERT INTO record_order(user_id, shipping_id, payment, payment_type, postage, status, express) VALUES (?, ?, ?, ?, ?, ?, ?);',
    add_detail: 'INSERT INTO record_order_detail(user_id, order_no, product_id, quantity) VALUES (?, last_insert_id(), ?, ?);',
    show: 'SELECT a.id, a.payment, a.postage, date_format(a.update_time, "%Y-%m-%d %H:%i:%S") AS updatetime, b.product_id, b.quantity, b.status, c.title, c.main_image, c.price, d.receiver_name, d.receiver_phone FROM record_order AS a, record_order_detail AS b, record_product AS c, record_shipping AS d WHERE a.user_id = ? AND a.id = b.order_no AND b.product_id = c.id AND a.shipping_id = d.id ORDER BY a.id DESC;',
    del: 'UPDATE record_order SET status = "已退款" WHERE id = ?;'
  },

  // 评论表
  comment: {
    show: 'SELECT id, userimg, user_name, user_id, product_id, content, score, date_format(create_time, "%Y-%m-%d %H:%i:%S") AS create_time FROM record_comment WHERE product_id = ? ORDER BY create_time DESC;',
    add: 'INSERT INTO record_comment(user_id,product_id,user_name,content,score,userimg) SELECT ?,?,username,?,?,userimg FROM record_user WHERE id = ?;'
  },

  // 管理员
  admin: {
    login: 'SELECT count(*) AS count, password FROM record_user WHERE username = ? AND role = 1;',
    usershow: 'SELECT id,username,phone,email,userimg,date_format(update_time, "%Y-%m-%d %H:%i:%S") AS update_time FROM record_user WHERE role = 0 ORDER BY update_time DESC;',
    deluser: 'UPDATE record_user SET role = 2 WHERE id = ?;',
    adduser: 'INSERT INTO record_user(username,password,email,phone,userimg) value(?,?,?,?,?);',

    category: 'SELECT id, name, status, date_format(update_time, "%Y-%m-%d %H:%i:%S") AS update_time FROM record_category ORDER BY update_time DESC;',
    addcategory: 'INSERT INTO record_category(name) value(?);',
    delcategory: 'UPDATE record_category SET status = ? WHERE id = ?;',
    categorypro: 'SELECT id, name, status, date_format(update_time, "%Y-%m-%d %H:%i:%S") AS update_time FROM record_category WHERE status = "使用中" ORDER BY update_time DESC;',

    product: 'SELECT *, date_format(update_time, "%Y-%m-%d %H:%i:%S") AS time FROM record_product WHERE category = ? AND status = 1 ORDER BY id DESC;',
    productupdate: 'UPDATE record_product SET title = ?, author = ?, price = ?, maprice = ?, validity = ?, catalog = ?, detail = ?, tags = ?, artist_intro = ?, editor_recom = ?, main_image = ? WHERE id = ?;',

    productadd: 'INSERT INTO record_product(category,author,title,main_image,detail,price,maprice,catalog,validity,artist_intro,editor_recom,category_id) VALUE(?,?,?,?,?,?,?,?,?,?,?,?)',
    productdel: 'UPDATE record_product SET status = 0 WHERE id = ?;',

    comment: 'SELECT id, userimg, user_name, user_id, product_id, content, date_format(create_time, "%Y-%m-%d %H:%i:%S") AS create_time FROM record_comment WHERE product_id = ? OR user_id = ? ORDER BY create_time DESC;',
    commentuser: 'SELECT userimg, user_name, user_id, product_id, content, date_format(create_time, "%Y-%m-%d %H:%i:%S") AS create_time FROM record_comment WHERE user_id = ? ORDER BY create_time DESC;',
    commentproduct: 'SELECT userimg, user_name, user_id, product_id, content, date_format(create_time, "%Y-%m-%d %H:%i:%S") AS create_time FROM record_comment WHERE product_id = ? ORDER BY create_time DESC;',
    commentdel: 'DELETE FROM record_comment WHERE id = ?;UPDATE record_product SET commentcount = commentcount - 1 WHERE id = ?;',

    order: 'SELECT a.id, a.payment, a.postage, date_format(a.update_time, "%Y-%m-%d %H:%i:%S") AS updatetime, b.user_id, b.product_id, b.quantity, b.status, c.title, c.main_image, c.price, d.receiver_name, d.receiver_phone FROM record_order AS a, record_order_detail AS b, record_product AS c, record_shipping AS d WHERE a.id = b.order_no AND b.product_id = c.id AND a.shipping_id = d.id ORDER BY a.id DESC;',
    orderupdate: 'UPDATE record_order_detail SET status = ? WHERE order_no = ? AND product_id = ?;',
    
    banner: 'SELECT * FROM record_banner ORDER BY id DESC;',
    bannerdel: 'UPDATE record_banner SET status = ? WHERE id = ?;',
    banneradd: 'INSERT INTO record_banner(image,status) value(?,?);'
  }
}

module.exports = sqlMap;
