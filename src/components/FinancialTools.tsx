import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Calculator, DollarSign, TrendingUp, PiggyBank, AlertTriangle } from 'lucide-react';

export function FinancialTools({ user }) {
  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState('50000');
  const [interestRate, setInterestRate] = useState('12');
  const [loanTerm, setLoanTerm] = useState('12');
  const [loanResults, setLoanResults] = useState(null);

  // ROI Calculator State
  const [cropType, setCropType] = useState('Rice (Palay)');
  const [farmSize, setFarmSize] = useState(user?.farmSize || '1.5');
  const [seedCost, setSeedCost] = useState('3000');
  const [fertilizerCost, setFertilizerCost] = useState('8000');
  const [laborCost, setLaborCost] = useState('15000');
  const [otherCosts, setOtherCosts] = useState('5000');
  const [expectedYield, setExpectedYield] = useState('5');
  const [expectedPrice, setExpectedPrice] = useState('24');
  const [roiResults, setROIResults] = useState(null);

  // Breakeven Calculator State
  const [fixedCosts, setFixedCosts] = useState('25000');
  const [variableCostPerUnit, setVariableCostPerUnit] = useState('18');
  const [pricePerUnit, setPricePerUnit] = useState('24');
  const [breakevenResults, setBreakevenResults] = useState(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseInt(loanTerm);
    
    const monthlyPayment = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - principal;
    
    setLoanResults({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      principal: principal.toFixed(2)
    });
  };

  const calculateROI = () => {
    const totalCosts = parseFloat(seedCost) + parseFloat(fertilizerCost) + parseFloat(laborCost) + parseFloat(otherCosts);
    const totalRevenue = parseFloat(expectedYield) * 1000 * parseFloat(expectedPrice); // Convert tons to kg
    const profit = totalRevenue - totalCosts;
    const roi = (profit / totalCosts) * 100;
    const profitPerHectare = profit / parseFloat(farmSize);
    
    setROIResults({
      totalCosts: totalCosts.toFixed(2),
      totalRevenue: totalRevenue.toFixed(2),
      profit: profit.toFixed(2),
      roi: roi.toFixed(1),
      profitPerHectare: profitPerHectare.toFixed(2),
      costBreakdown: [
        { name: 'Seeds', value: parseFloat(seedCost) },
        { name: 'Fertilizer', value: parseFloat(fertilizerCost) },
        { name: 'Labor', value: parseFloat(laborCost) },
        { name: 'Others', value: parseFloat(otherCosts) }
      ]
    });
  };

  const calculateBreakeven = () => {
    const fixed = parseFloat(fixedCosts);
    const variableCost = parseFloat(variableCostPerUnit);
    const price = parseFloat(pricePerUnit);
    
    const contributionMargin = price - variableCost;
    const breakevenQuantity = fixed / contributionMargin;
    const breakevenRevenue = breakevenQuantity * price;
    
    setBreakevenResults({
      breakevenQuantity: breakevenQuantity.toFixed(2),
      breakevenRevenue: breakevenRevenue.toFixed(2),
      contributionMargin: contributionMargin.toFixed(2)
    });
  };

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

  const cropPresets = {
    'Rice (Palay)': { seeds: 3000, fertilizer: 8000, labor: 15000, others: 5000, yield: 5, price: 24 },
    'Corn': { seeds: 4000, fertilizer: 10000, labor: 12000, others: 6000, yield: 8, price: 18 },
    'Tomato': { seeds: 2000, fertilizer: 6000, labor: 20000, others: 8000, yield: 15, price: 45 }
  };

  const handleCropChange = (crop) => {
    setCropType(crop);
    const preset = cropPresets[crop];
    if (preset) {
      setSeedCost(preset.seeds.toString());
      setFertilizerCost(preset.fertilizer.toString());
      setLaborCost(preset.labor.toString());
      setOtherCosts(preset.others.toString());
      setExpectedYield(preset.yield.toString());
      setExpectedPrice(preset.price.toString());
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <h2>Financial Tools</h2>
      <p className="text-sm text-muted-foreground">
        Plan your farming finances with our calculators
      </p>

      <Tabs defaultValue="roi" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="roi">ROI Calculator</TabsTrigger>
          <TabsTrigger value="loan">Loan Calculator</TabsTrigger>
          <TabsTrigger value="breakeven">Break-even Analysis</TabsTrigger>
        </TabsList>

        {/* ROI Calculator */}
        <TabsContent value="roi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Return on Investment Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="crop-type">Crop Type</Label>
                  <Select value={cropType} onValueChange={handleCropChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rice (Palay)">Rice (Palay)</SelectItem>
                      <SelectItem value="Corn">Corn</SelectItem>
                      <SelectItem value="Tomato">Tomato</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="farm-size">Farm Size (hectares)</Label>
                  <Input
                    id="farm-size"
                    type="number"
                    step="0.1"
                    value={farmSize}
                    onChange={(e) => setFarmSize(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="seed-cost">Seed Cost (₱)</Label>
                  <Input
                    id="seed-cost"
                    type="number"
                    value={seedCost}
                    onChange={(e) => setSeedCost(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="fertilizer-cost">Fertilizer Cost (₱)</Label>
                  <Input
                    id="fertilizer-cost"
                    type="number"
                    value={fertilizerCost}
                    onChange={(e) => setFertilizerCost(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="labor-cost">Labor Cost (₱)</Label>
                  <Input
                    id="labor-cost"
                    type="number"
                    value={laborCost}
                    onChange={(e) => setLaborCost(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="other-costs">Other Costs (₱)</Label>
                  <Input
                    id="other-costs"
                    type="number"
                    value={otherCosts}
                    onChange={(e) => setOtherCosts(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="expected-yield">Expected Yield (tons)</Label>
                  <Input
                    id="expected-yield"
                    type="number"
                    step="0.1"
                    value={expectedYield}
                    onChange={(e) => setExpectedYield(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="expected-price">Expected Price (₱/kg)</Label>
                  <Input
                    id="expected-price"
                    type="number"
                    step="0.1"
                    value={expectedPrice}
                    onChange={(e) => setExpectedPrice(e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={calculateROI} className="w-full">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate ROI
              </Button>
            </CardContent>
          </Card>

          {roiResults && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Costs:</span>
                      <span>₱{roiResults.totalCosts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Revenue:</span>
                      <span>₱{roiResults.totalRevenue}</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span>Net Profit:</span>
                      <span className={parseFloat(roiResults.profit) > 0 ? 'text-green-600' : 'text-red-600'}>
                        ₱{roiResults.profit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROI:</span>
                      <span className={parseFloat(roiResults.roi) > 0 ? 'text-green-600' : 'text-red-600'}>
                        {roiResults.roi}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Profit per Hectare:</span>
                      <span>₱{roiResults.profitPerHectare}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={roiResults.costBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {roiResults.costBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₱${value}`, 'Cost']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Loan Calculator */}
        <TabsContent value="loan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="w-5 h-5" />
                Loan Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="loan-amount">Loan Amount (₱)</Label>
                  <Input
                    id="loan-amount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="interest-rate">Interest Rate (% per year)</Label>
                  <Input
                    id="interest-rate"
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="loan-term">Loan Term (months)</Label>
                  <Input
                    id="loan-term"
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="text-center p-2 bg-muted rounded">
                  <div>Common rates:</div>
                  <div>10-15% annually</div>
                </div>
                <div className="text-center p-2 bg-muted rounded">
                  <div>Typical terms:</div>
                  <div>6-24 months</div>
                </div>
                <div className="text-center p-2 bg-muted rounded">
                  <div>Max loan:</div>
                  <div>₱100,000-500,000</div>
                </div>
              </div>

              <Button onClick={calculateLoan} className="w-full">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Loan
              </Button>
            </CardContent>
          </Card>

          {loanResults && (
            <Card>
              <CardHeader>
                <CardTitle>Loan Calculation Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="text-center p-4 bg-primary text-primary-foreground rounded">
                      <div className="text-sm">Monthly Payment</div>
                      <div className="text-2xl">₱{loanResults.monthlyPayment}</div>
                    </div>
                    <div className="flex justify-between">
                      <span>Principal Amount:</span>
                      <span>₱{loanResults.principal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Interest:</span>
                      <span>₱{loanResults.totalInterest}</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span>Total Payment:</span>
                      <span>₱{loanResults.totalPayment}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm">Important Notes</span>
                      </div>
                      <ul className="text-xs space-y-1 text-yellow-800">
                        <li>• Ensure cash flow can cover monthly payments</li>
                        <li>• Consider seasonal income variations</li>
                        <li>• Factor in emergency fund requirements</li>
                        <li>• Compare rates from different lenders</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Breakeven Analysis */}
        <TabsContent value="breakeven" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Break-even Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="fixed-costs">Fixed Costs (₱)</Label>
                  <Input
                    id="fixed-costs"
                    type="number"
                    value={fixedCosts}
                    onChange={(e) => setFixedCosts(e.target.value)}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Land rent, equipment, insurance
                  </div>
                </div>
                <div>
                  <Label htmlFor="variable-cost">Variable Cost per Unit (₱/kg)</Label>
                  <Input
                    id="variable-cost"
                    type="number"
                    step="0.1"
                    value={variableCostPerUnit}
                    onChange={(e) => setVariableCostPerUnit(e.target.value)}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Seeds, fertilizer, labor per kg
                  </div>
                </div>
                <div>
                  <Label htmlFor="price-per-unit">Selling Price per Unit (₱/kg)</Label>
                  <Input
                    id="price-per-unit"
                    type="number"
                    step="0.1"
                    value={pricePerUnit}
                    onChange={(e) => setPricePerUnit(e.target.value)}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Expected market price
                  </div>
                </div>
              </div>

              <Button onClick={calculateBreakeven} className="w-full">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Break-even Point
              </Button>
            </CardContent>
          </Card>

          {breakevenResults && (
            <Card>
              <CardHeader>
                <CardTitle>Break-even Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded">
                    <div className="text-sm text-muted-foreground">Break-even Quantity</div>
                    <div className="text-2xl">{breakevenResults.breakevenQuantity} kg</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded">
                    <div className="text-sm text-muted-foreground">Break-even Revenue</div>
                    <div className="text-2xl">₱{breakevenResults.breakevenRevenue}</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded">
                    <div className="text-sm text-muted-foreground">Contribution Margin</div>
                    <div className="text-2xl">₱{breakevenResults.contributionMargin}/kg</div>
                  </div>
                </div>
                
                <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm">
                    <strong>Interpretation:</strong> You need to sell at least {breakevenResults.breakevenQuantity} kg 
                    to cover all your costs. Any sales beyond this point will be pure profit.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}