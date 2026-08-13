package hk.edu20260813.day09;

public class D1_VIPCustomer extends D1_Customer {

    // private int customerID;// 고객ID
    // private String customerName;// 고객이름
    // private String customerGrade;// 고객등급
    // private int bonusPoint;// 보너스 포인트
    // private double bonusRatio;// 보너스 적립률

    private int agentID; // 담당 상담원 ID
    private double saleRatio;// 할인율

    public D1_VIPCustomer() {
        // setCustomerGrade("VIP");
        super.customerGrade = "VIP";
        super.bonusRatio = 0.05;
        this.saleRatio = 0.1;
    }

    public D1_VIPCustomer(int customerID, String customerName, int agentID) {
        super.customerID = customerID;
        super.customerName = customerName;
        super.customerGrade = "VIP";
        super.bonusRatio = 0.05;
        this.saleRatio = 0.1;
        this.agentID = agentID;
    }

    // 부모에서는 보너스 적립률만 계산하는 기능
    // -> 자식에서는 할인률도 계산하는 기능이 추가
    // -> 자식에서 기능을 재정의하자 : 오버라이딩
    @Override
    public int calcPrice(int price) {
        super.bonusPoint += price * bonusRatio;// 보너스 적립
        return price - (int) (price * saleRatio);// 할인된 가격 적용
    }

    @Override
    public String toString() {
        return customerName + "님의 등급은 " + customerGrade
                + "이며, 보너스 포인트는 " + bonusPoint + "입니다.";
    }
}
